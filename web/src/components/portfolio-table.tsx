"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

type Holding = {
  halal_rank: number;
  ticker: string;
  company: string;
  halal_weight: number;
  original_weight: number;
  halal_status: string;
  interest_pct: number | null;
  rank: number;
  weight: number;
};

function formatMoney(amount: number): string {
  if (amount >= 1000) {
    return amount.toLocaleString("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }) + " EUR";
  }
  return amount.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " EUR";
}

export function PortfolioTable({
  holdings,
  includedCount,
}: {
  holdings: Holding[];
  includedCount: number;
}) {
  const [portfolio, setPortfolio] = useState<string>("");

  const amount = parseFloat(portfolio.replace(/\s/g, "").replace(",", ".")) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Composition de l'indice</CardTitle>
        <CardDescription>
          {includedCount} actions halal — poids redistribues pro-rata (total = 100%)
        </CardDescription>
        <div className="flex items-center gap-3 pt-2">
          <label htmlFor="portfolio" className="text-sm font-medium whitespace-nowrap">
            Mon portefeuille :
          </label>
          <div className="relative max-w-xs">
            <Input
              id="portfolio"
              type="text"
              inputMode="decimal"
              placeholder="ex: 10000"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
              EUR
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Ticker</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead className="text-right">Poids</TableHead>
              {amount > 0 && (
                <TableHead className="text-right">Montant</TableHead>
              )}
              <TableHead className="text-right text-zinc-400">Poids original</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holdings.map((h) => (
              <TableRow key={h.ticker}>
                <TableCell className="font-mono text-zinc-400">
                  {h.halal_rank}
                </TableCell>
                <TableCell className="font-bold">{h.ticker}</TableCell>
                <TableCell>{h.company}</TableCell>
                <TableCell className="text-right font-mono">
                  {h.halal_weight.toFixed(2)}%
                </TableCell>
                {amount > 0 && (
                  <TableCell className="text-right font-mono font-semibold">
                    {formatMoney(amount * h.halal_weight / 100)}
                  </TableCell>
                )}
                <TableCell className="text-right font-mono text-zinc-400">
                  {h.original_weight.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
