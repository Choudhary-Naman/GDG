"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";
import { reviews } from "@/constants";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

import { useSubmissions } from "@/components/SubmissionsProvider";

const departments = reviews;

const DepartmentsListPage = () => {
  const router = useRouter();
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const { submittedDepartments } = useSubmissions();

  const [selectedCount, setSelectedCount] = useState(0);
  const [remainingSlots, setRemainingSlots] = useState(2);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [computedDepartmentList, setComputedDepartmentList] = useState([]);

  useEffect(() => {
    setComputedDepartmentList(JSON.parse(JSON.stringify(departments)));
  }, []);

  useEffect(() => {
    setSelectedCount(selectedDepartments.length);
  }, [selectedDepartments]);

  useEffect(() => {
    setRemainingSlots(2 - submittedDepartments.length);
  }, [submittedDepartments]);

  useEffect(() => {
    const ids = computedDepartmentList
      .filter((dept) => selectedDepartments.includes(dept.name))
      .map((dept) => dept.id);
    setSelectedIds(ids);
  }, [selectedDepartments, computedDepartmentList]);

  useEffect(() => {
    setIsContinueDisabled(selectedIds.length === 0);
  }, [selectedIds]);

  const toggleDepartment = (departmentName) => {
    if (submittedDepartments.includes(departmentName)) {
      toast.error(`You have already submitted an application for ${departmentName}.`);
      return;
    }

    if (remainingSlots <= 0) {
      toast.error("You have already submitted the maximum allowed (2) applications.");
      return;
    }

    setSelectedDepartments((current) => {
      const isSelected = current.includes(departmentName);

      if (isSelected) {
        return current.filter((name) => name !== departmentName);
      }

      if (current.length >= remainingSlots) {
        toast.error(`You can select at most ${remainingSlots} department(s).`);
        return current;
      }

      return [...current, departmentName];
    });
  };

  const goToApplication = () => {
    if (!selectedIds.length) return;
    router.push(`/join/${selectedIds.join("/")}`);
  };

  const DepartmentCard = ({ department }) => {
    const isSelected = selectedDepartments.includes(department.name);
    const isSubmitted = submittedDepartments.includes(department.name);

    return (
      <Card
        role="button"
        tabIndex={isSubmitted ? -1 : 0}
        onClick={() => !isSubmitted && toggleDepartment(department.name)}
        onKeyDown={(e) => {
          if (!isSubmitted && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            toggleDepartment(department.name);
          }
        }}
        className={cn(
          "relative flex cursor-pointer flex-col gap-3 p-5 transition-all duration-150",
          isSubmitted && "cursor-not-allowed opacity-60",
          isSelected && !isSubmitted && "border-primary ring-2 ring-primary/40",
          !isSelected && !isSubmitted && "hover:border-primary/40 hover:bg-accent/40"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: department.color || "#3B82F6" }}
          />
          <div className="flex-1">
            <CardTitle className="text-base font-semibold leading-snug">
              {department.name}
            </CardTitle>
            <CardDescription className="mt-1.5 text-sm leading-relaxed">
              {department.description}
            </CardDescription>
          </div>
          <div className="shrink-0 pt-0.5">
            {isSubmitted ? (
              <Badge variant="secondary" className="gap-1">
                <Lock className="h-3 w-3" /> Submitted
              </Badge>
            ) : (
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleDepartment(department.name)}
                onClick={(e) => e.stopPropagation()}
                aria-label={`Select ${department.name}`}
              />
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <main className="min-h-screen pb-32">
      <NavBar />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
        <header className="mb-10 space-y-3 text-center">
          <Badge variant="secondary">Step 01 &middot; Select</Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pick your departments
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Select up to <strong className="text-foreground">two</strong> departments you&apos;d like to apply for. You can always come back for the second later.
          </p>
        </header>

        <section>
          <div className="grid gap-4 sm:grid-cols-2">
            {computedDepartmentList.map((department, index) => (
              <DepartmentCard key={department.id || index} department={department} />
            ))}
          </div>
        </section>
      </div>

      <Footer />

      {/* Sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            {selectedCount > 0 ? (
              <CheckCircle2 className="h-4 w-4 text-primary" />
            ) : null}
            <span className="font-medium">{selectedCount} / 2 selected</span>
          </div>
          <Button
            onClick={goToApplication}
            disabled={isContinueDisabled}
            size="lg"
          >
            Continue to application <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default DepartmentsListPage;
