import type { Investor } from "../types";

/** MIGRATED — use as reference when converting .js models */
const investors: Investor[] = [
  {
    id: "INV001",
    name: "Rahul Sharma",
    email: "rahul@kfintech.demo",
    pan: "ABCDE1234F",
    mobile: "9876500001",
    kycStatus: "verified",
  },
  {
    id: "INV002",
    name: "Anjali Verma",
    email: "anjali@kfintech.demo",
    pan: "FGHIJ5678K",
    mobile: "9876500002",
    kycStatus: "verified",
  },
  {
    id: "INV003",
    name: "Vikram Patel",
    email: "vikram@kfintech.demo",
    pan: "LMNOP9012Q",
    mobile: "9876500003",
    kycStatus: "pending",
  },
];

export function getAllInvestors(): Investor[] {
  return investors;
}

export function getInvestorById(id: string): Investor | undefined {
  return investors.find((inv) => inv.id === id);
}

export function getInvestorByMobile(mobile: string): Investor | undefined {
  return investors.find((inv) => inv.mobile === mobile);
}
