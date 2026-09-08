"use client";
import React from "react";
import DataTable from "./DataTable";

// Authorization is enforced server-side in app/(pages)/admin/page.jsx before
// this component ever receives `applicants`. By the time this renders, the
// caller has already been verified as an admin, so no client-side gating is
// needed (or safe to rely on) here.
const AdminContent = ({ applicants }) => {
  return (
    <div>
      <DataTable data={applicants} />
    </div>
  );
};

export default AdminContent;

