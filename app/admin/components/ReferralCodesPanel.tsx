"use client";

import { useState } from "react";
import { Copy, Gift, Plus, Search } from "lucide-react";
import EmptyState from "@/admin/components/EmptyState";
import StatusBadge from "@/admin/components/StatusBadge";
import { Button } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";

export interface ReferralCodeRow {
  id: string;
  code: string;
  ownerEmail: string;
  usedCount: number;
  isActive: boolean;
  createdAt: string;
}

interface ReferralCodesPanelProps {
  codes: ReferralCodeRow[];
  emailFilter: string;
  ownerEmail: string;
  onEmailFilterChange: (value: string) => void;
  onOwnerEmailChange: (value: string) => void;
  onCreateCode: (e: React.FormEvent) => void;
  onDeactivate: (code: string) => void;
}

const ReferralCodesPanel = ({
  codes,
  emailFilter,
  ownerEmail,
  onEmailFilterChange,
  onOwnerEmailChange,
  onCreateCode,
  onDeactivate,
}: ReferralCodesPanelProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyLink = (code: string) => {
    const link = `${SITE_URL}/enrol?ref=${code}&plan=essential`;
    void navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900">
          Generate referral code
        </h2>
        <form
          className="mt-4 flex flex-col gap-3 sm:flex-row"
          onSubmit={onCreateCode}
        >
          <input
            required
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
            placeholder="parent@email.com"
            type="email"
            value={ownerEmail}
            onChange={(e) => onOwnerEmailChange(e.target.value)}
          />
          <Button className="cursor-pointer shrink-0" type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Create code
          </Button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm"
            placeholder="Filter by owner email"
            type="search"
            value={emailFilter}
            onChange={(e) => onEmailFilterChange(e.target.value)}
          />
        </div>
      </div>

      {codes.length === 0 ? (
        <EmptyState
          description="Codes are auto-generated after payment, or you can create one manually above."
          icon={Gift}
          title="No referral codes found"
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {codes.map((code) => (
              <li key={code.id} className="px-6 py-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-mono text-sm font-semibold text-slate-900">
                        {code.code}
                      </p>
                      <StatusBadge tone={code.isActive ? "success" : "danger"}>
                        {code.isActive ? "Active" : "Inactive"}
                      </StatusBadge>
                      <StatusBadge tone="neutral">
                        {code.usedCount} uses
                      </StatusBadge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {code.ownerEmail}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Created{" "}
                      {new Date(code.createdAt).toLocaleDateString("en-AU")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      type="button"
                      onClick={() => copyLink(code.code)}
                    >
                      <Copy className="h-4 w-4" />
                      {copiedCode === code.code ? "Copied" : "Copy link"}
                    </button>
                    {code.isActive && (
                      <button
                        className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
                        type="button"
                        onClick={() => onDeactivate(code.code)}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ReferralCodesPanel;
