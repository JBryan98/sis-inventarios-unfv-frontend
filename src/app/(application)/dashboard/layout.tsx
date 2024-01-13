import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: {
    default: "Dashboard - Sistema de inventarios de TI UNFV",
    template: "%s Dashboard - Sistema de inventarios de TI UNFV",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
