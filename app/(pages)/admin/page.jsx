import React from "react";
import { headers } from "next/headers";
import NavBar from "@/components/NavBar";
import { auth } from "@/lib/auth";
import { connect, serializeFirestoreData } from "@/lib/db";
import AdminContent from "@/components/AdminContent";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // IMPORTANT: this check must happen, and must succeed, BEFORE any
  // applicant data is fetched. Server Component props are serialized into
  // the page payload sent to the browser regardless of how the client
  // later chooses to render them, so gating only in the client component
  // (AdminContent) does not prevent the data from reaching an unauthorized
  // browser.
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user || session.user.role !== "admin") {
    return (
      <main>
        <NavBar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Access Denied</h2>
          <p>You are not authorized to view this page.</p>
        </div>
      </main>
    );
  }

  const db = await connect();
  const snapshot = await db.collection("formData").get();
  const applicants = snapshot.docs.map((doc) => ({
    id: doc.id,
    _id: doc.id,
    ...serializeFirestoreData(doc.data()),
  }));

  return (
    <main>
      <NavBar />
      <AdminContent applicants={applicants} />
    </main>
  );
}
