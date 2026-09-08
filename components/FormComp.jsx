"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { QuestionnaireData } from "@/constants";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useSubmissions } from "@/components/SubmissionsProvider";

const normaliseQuestion = (question) => (
  typeof question === "string"
    ? { name: question, type: "generic", placeholder: "2-3 sentences" }
    : question
);

const WHY_JOIN_QUESTION = "Why do you want to join Organization Name?";

const FormComp = ({ dept1, dept2, isLoading, setIsLoading }) => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const isSignedIn = !!user;
  const isLoaded = !isPending;

  const [isFormOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastFailedDepartments, setLastFailedDepartments] = useState([]);

  const router = useRouter();
  const { submittedDepartments: contextSubmitted, markDepartmentsSubmitted } = useSubmissions();
  const [submittedDepartments, setSubmittedDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDraftReady, setIsDraftReady] = useState(false);

  const departmentNames = useMemo(
    () => [dept1, dept2].filter(Boolean).map((department) => typeof department === "string" ? department : department.name),
    [dept1, dept2]
  );

  const draftKey = user?.email && departmentNames.length
    ? `recruitment-draft:${user.email}:${[...departmentNames].sort().join("|")}`
    : null;

  useEffect(() => {
    if (user) {
      checkApplicationCount(user.email);
    }
  }, [user]);

  async function checkApplicationCount(userEmail) {
    try {
      const checkResponse = await fetch(`/api/check-applications?email=${userEmail}`);
      const { count } = await checkResponse.json();

      if (count >= 2) {
        setErrorMessage("Remember that you can only submit up to 2 unique applications.");
      }
    } catch (err) {
      console.error("Failed to check application count:", err);
    }
  }

  const normalizeDeptName = (str) => (str ? str.trim().toLowerCase().replace(/\s*\/\s*/g, "/") : "");

  const questionData = useMemo(
    () => [...new Set(departmentNames.flatMap((department) =>
      (QuestionnaireData.find((item) => normalizeDeptName(item.department) === normalizeDeptName(department))?.questions ?? [])
        .map(normaliseQuestion)
        .map((question) => question.name)
    ))],
    [departmentNames]
  );

  const schemaObj = {
    Name: z.string().min(1, "Name is required"),
    RegistrationNumber: z
      .string()
      .min(1, "Registration number is required")
      .regex(
        /^\d{2}[A-Z]{3}\d{4}$/,
        "Registration number must be 2 numbers, 3 uppercase letters, and 4 numbers (e.g. 25BCE5612)"
      ),
    Email: z.string(),
    Phone: z
      .string()
      .min(1, "Phone is required")
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    Gender: z.string().optional(),
    "Year of Study": z.string().optional(),
    [WHY_JOIN_QUESTION]: z.string().min(1, "This field is required"),
  };

  questionData.forEach((qd) => {
    schemaObj[qd] = z.string().optional();
  });

  const formSchema = z.object(schemaObj);
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      Name: "",
      RegistrationNumber: "",
      Email: "",
      Phone: "",
      Gender: "",
      "Year of Study": "",
      [WHY_JOIN_QUESTION]: "",
    },
  });

  useEffect(() => {
    if (!isLoaded || !user || !draftKey) return;

    const email = user.email;
    let isActive = true;
    setIsDraftReady(false);
    setLoading(true);

    try {
      const savedDraft = JSON.parse(localStorage.getItem(draftKey) || "{}");
      form.reset({ ...form.getValues(), ...savedDraft.values, Email: email });
    } catch {
      form.setValue("Email", email);
    }

    async function initialiseForm() {
      const savedDraft = JSON.parse(localStorage.getItem(draftKey) || "{}");
      let remoteSubmitted = contextSubmitted || [];

      if (!remoteSubmitted.length) {
        const cacheKey = `submitted_depts_${email}`;
        const cached = typeof window !== "undefined" ? sessionStorage.getItem(cacheKey) : null;

        if (cached) {
          try {
            remoteSubmitted = JSON.parse(cached);
          } catch {}
        } else {
          try {
            const response = await fetch(`/api/check-applications?email=${encodeURIComponent(email)}`);
            const result = await response.json();
            if (result?.submittedDepartments) {
              remoteSubmitted = result.submittedDepartments;
              if (typeof window !== "undefined") {
                sessionStorage.setItem(cacheKey, JSON.stringify(remoteSubmitted));
              }
            }
          } catch (err) {
            console.error("Failed to check applications:", err);
          }
        }
      }

      if (!isActive) return;
      const completed = [...new Set([...(savedDraft.submittedDepartments || []), ...remoteSubmitted])];
      setSubmittedDepartments(completed);
      if (departmentNames.length > 0 && departmentNames.every((dept) => completed.includes(dept))) {
        setErrorMessage(`You have already submitted an application for ${departmentNames.join(" and ")}.`);
      }
      localStorage.setItem(draftKey, JSON.stringify({ values: form.getValues(), submittedDepartments: completed }));
      setLoading(false);
      setIsDraftReady(true);
    }

    initialiseForm().catch(() => {
      if (isActive) {
        setLoading(false);
        setIsDraftReady(true);
      }
    });

    return () => { isActive = false; };
  }, [contextSubmitted, departmentNames, draftKey, form, isLoaded, user]);

  const watchedValues = useWatch({ control: form.control });

  useEffect(() => {
    if (!isDraftReady || !draftKey) return;
    localStorage.setItem(draftKey, JSON.stringify({ values: watchedValues, submittedDepartments }));
  }, [draftKey, isDraftReady, submittedDepartments, watchedValues]);

  // Loading auth state
  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access the application form.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!departmentNames.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>No department selected</CardTitle>
            <CardDescription>
              Head back and pick at least one department to apply to.
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button onClick={() => router.push("/departments")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Choose departments
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const userEmail = user?.email;

  const handleSubmit = async (values, isRetry = false) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const target = isRetry && lastFailedDepartments.length
      ? lastFailedDepartments
      : departmentNames;
    const pendingDepartments = target.filter((department) => !submittedDepartments.includes(department));

    if (!pendingDepartments.length) {
      toast.success("Your applications have already been submitted.");
      setIsSubmitting(false);
      router.push("/departments");
      return;
    }

    const basicDetails = {
      Name: values.Name,
      RegistrationNumber: values.RegistrationNumber,
      Email: values.Email,
      Phone: values.Phone,
      Gender: values.Gender,
      "Year of Study": values["Year of Study"],
    };

    const submitDepartment = async (department) => {
      const questions = (QuestionnaireData.find((item) => normalizeDeptName(item.department) === normalizeDeptName(department))?.questions ?? [])
        .map(normaliseQuestion);

      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...basicDetails,
          Department: department,
          Questions: {
            [WHY_JOIN_QUESTION]: values[WHY_JOIN_QUESTION] || "",
            ...questions.reduce((answers, question) => ({ ...answers, [question.name]: values[question.name] || "" }), {}),
          },
        }),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Could not submit ${department}.`);
      }
      return { department, success: true };
    };

    try {
      const results = await Promise.allSettled(pendingDepartments.map(submitDepartment));
      const successful = results
        .filter((result) => result.status === "fulfilled" && result.value.success)
        .map((result) => result.value.department);
      const failed = results.flatMap((result, index) =>
        result.status === "rejected" ? [pendingDepartments[index]] : []
      );
      const firstFailureReason = results.find((result) => result.status === "rejected")?.reason?.message;
      const completed = [...new Set([...submittedDepartments, ...successful])];

      setSubmittedDepartments(completed);
      markDepartmentsSubmitted(completed);
      setLastFailedDepartments(failed);
      if (draftKey) localStorage.setItem(draftKey, JSON.stringify({ values, submittedDepartments: completed }));
      if (typeof window !== "undefined" && values?.Email) {
        sessionStorage.setItem(`submitted_depts_${values.Email}`, JSON.stringify(completed));
      }
      successful.forEach((department) => toast.success(`Application submitted for ${department}.`));

      if (failed.length) {
        setErrorMessage(
          `${successful.length ? `Submitted for ${successful.join(", ")}. ` : ""}Couldn't submit for ${failed.join(", ")}${firstFailureReason ? `: ${firstFailureReason}` : ". Please retry."}`
        );
      } else {
        toast.success("All applications submitted successfully!");
        router.push("/departments");
      }
    } catch (err) {
      setErrorMessage(err?.message || "Your applications could not be submitted. Your saved answers have been kept so you can retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking your application status...</p>
        </div>
      </div>
    );
  }

  if (!isFormOpen) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Recruitment Closed</CardTitle>
            <CardDescription>Recruitment has now been terminated.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const allSubmitted = departmentNames.length > 0 && departmentNames.every((d) => submittedDepartments.includes(d));

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <div className="mb-8 space-y-2 text-center">
        <Badge variant="secondary" className="mb-2">Application Form</Badge>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s get you applied
        </h1>
        <p className="text-muted-foreground">
          Applying to{" "}
          <span className="font-semibold text-foreground">
            {departmentNames.join(" & ")}
          </span>
        </p>
      </div>

      {errorMessage && !isSubmitting && (
        <Card className="mb-6 border-destructive/40 bg-destructive/10">
          <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm text-foreground">{errorMessage}</p>
            </div>
            <div className="flex shrink-0 gap-2 self-end sm:self-auto">
              {lastFailedDepartments.length > 0 && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => form.handleSubmit((values) => handleSubmit(values, true))()}
                  disabled={isSubmitting}
                >
                  <RotateCcw className="mr-2 h-3.5 w-3.5" /> Retry
                </Button>
              )}
              <Button type="button" size="sm" variant="outline" onClick={() => router.push("/departments")}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {allSubmitted && !errorMessage && (
        <Card className="mb-6 border-emerald-500/30 bg-emerald-500/10">
          <CardContent className="flex items-center gap-3 pt-6">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            <p className="text-sm">
              You&apos;ve already submitted for {departmentNames.join(" and ")}.
            </p>
          </CardContent>
        </Card>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => handleSubmit(values, false))} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About You</CardTitle>
              <CardDescription>Tell us the basics so we can get in touch.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Jane Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="RegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. 25BCE5612" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Year of Study"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year of Study</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly type="email" className="opacity-70" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (WhatsApp)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="9876543210" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="sm:col-span-2">
                <FormField
                  control={form.control}
                  name={WHY_JOIN_QUESTION}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{WHY_JOIN_QUESTION}</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} placeholder="2-3 sentences" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {renderDepartmentQuestions(departmentNames[0], QuestionnaireData, form, normalizeDeptName)}
          {departmentNames[1] && renderDepartmentQuestions(departmentNames[1], QuestionnaireData, form, normalizeDeptName)}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/departments")}
              disabled={isSubmitting}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" disabled={isSubmitting || allSubmitted} size="lg" className="sm:min-w-[200px]">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : allSubmitted ? (
                "Already Submitted"
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
};

const renderDepartmentQuestions = (department, QuestionnaireData, form, normalizeDeptName) => {
  const questions = (
    QuestionnaireData.find((qd) => normalizeDeptName(qd.department) === normalizeDeptName(department))?.questions ?? []
  )
    .map(normaliseQuestion)
    .filter((question) => question.name !== WHY_JOIN_QUESTION && question.name !== "Why do you want to join DWASFW?");

  if (!questions.length) return null;

  return (
    <Card key={department}>
      <CardHeader>
        <CardTitle className="text-xl">{department} Questions</CardTitle>
        <CardDescription>Help us understand your fit for this department.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {questions.map((question) => {
          const isCompact = question.type === "short-text";

          return (
            <FormField
              key={question.name}
              control={form.control}
              name={question.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{question.name}</FormLabel>
                  <FormControl>
                    {isCompact ? (
                      <Input {...field} placeholder={question.placeholder || "Answer..."} />
                    ) : (
                      <Textarea {...field} rows={4} placeholder={question.placeholder || "2-3 sentences"} />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default FormComp;
