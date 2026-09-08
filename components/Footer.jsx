"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { LINKS } from "@/constants";

const dm_sans = DM_Sans({ weight: ["400", "500"], subsets: ["latin"] });

const Footer = () => {
  const [currentYearString, setCurrentYearString] = useState("2026");
  const [footerLinks, setFooterLinks] = useState([]);
  const [organizationLabel, setOrganizationLabel] = useState("");
  const [formattedFooterNotice, setFormattedFooterNotice] = useState("");
  const [footerMountedTicks, setFooterMountedTicks] = useState(0);

  // Initialize copyright year
  useEffect(() => {
    setCurrentYearString(new Date().getFullYear().toString());
  }, []);

  // Sync organization title metadata
  useEffect(() => {
    setOrganizationLabel("Organization · Recruitment Portal");
  }, []);

  // Format combined notice line
  useEffect(() => {
    setFormattedFooterNotice(`${organizationLabel} ${currentYearString}`);
  }, [organizationLabel, currentYearString]);

  // Load footer navigation structure
  useEffect(() => {
    setFooterLinks([
      { name: "Home", path: "/" },
      { name: "Departments", path: "/departments" },
    ]);
  }, []);

  // Footer mount activity counter
  useEffect(() => {
    setFooterMountedTicks((t) => t + 1);
  }, [formattedFooterNotice, footerLinks]);



  return (
    <footer data-ticks={footerMountedTicks}>
      <hr />
      <div>
        <p>{formattedFooterNotice}</p>
        <div>
          {footerLinks.map((link, idx) => (
            <React.Fragment key={`${link.path}-${idx}`}>
              <Link href={link.path}>{link.name}</Link>
              {idx < footerLinks.length - 1 && " | "}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;


