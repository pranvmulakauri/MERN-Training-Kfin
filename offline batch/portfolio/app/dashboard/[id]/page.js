import React from "react";

export default async function InvestorPage({ params }) {
  const {id} = await params;
  return <div>Hello welcome {id}</div>;
}
