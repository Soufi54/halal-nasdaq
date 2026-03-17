import data from "@/data.json";
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
import { Badge } from "@/components/ui/badge";

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

type ExcludedHolding = {
  ticker: string;
  company: string;
  weight: number;
  halal_status: string;
};

const holdings = data.holdings as Holding[];
const excluded = data.excluded as ExcludedHolding[];
const stats = data.stats;

function StatusBadge({ status }: { status: string }) {
  if (status === "halal") {
    return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Halal</Badge>;
  }
  if (status === "doubtful") {
    return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Doubtful</Badge>;
  }
  return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Non conforme</Badge>;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b bg-white dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight">
            NASDAQ 100 Halal
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Indice NASDAQ 100 reconstitue selon les criteres AAOIFI — Mise a
            jour : {data.date}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Actions incluses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{stats.included}</p>
              <p className="text-xs text-zinc-500">
                sur {stats.total_nasdaq100}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Actions exclues</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {stats.excluded}
              </p>
              <p className="text-xs text-zinc-500">
                {stats.excluded_weight_pct}% du poids original
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Halal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-emerald-600">
                {stats.halal_count}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Doubtful</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-600">
                {stats.doubtful_count}
              </p>
              <p className="text-xs text-zinc-500">inclus dans l'indice</p>
            </CardContent>
          </Card>
        </div>

        {/* Composition */}
        <Card>
          <CardHeader>
            <CardTitle>Composition de l'indice</CardTitle>
            <CardDescription>
              {stats.included} actions — poids redistribues pro-rata (total =
              100%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead className="text-right">Poids halal</TableHead>
                  <TableHead className="text-right">Poids original</TableHead>
                  <TableHead>Statut</TableHead>
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
                    <TableCell className="text-right font-mono text-zinc-400">
                      {h.original_weight.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={h.halal_status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Exclues */}
        <Card>
          <CardHeader>
            <CardTitle>Actions exclues</CardTitle>
            <CardDescription>
              {stats.excluded} actions non-conformes AAOIFI (
              {stats.excluded_weight_pct}% du NASDAQ 100 original)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead className="text-right">Poids original</TableHead>
                  <TableHead>Raison</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {excluded.map((h) => (
                  <TableRow key={h.ticker}>
                    <TableCell className="font-bold">{h.ticker}</TableCell>
                    <TableCell>{h.company}</TableCell>
                    <TableCell className="text-right font-mono">
                      {h.weight.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={h.halal_status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Methodologie */}
        <Card>
          <CardHeader>
            <CardTitle>Methodologie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              <strong>Source des poids :</strong> ETF QQQ (Invesco) via
              SlickCharts. Mis a jour hebdomadairement.
            </p>
            <p>
              <strong>Screening halal :</strong> Zoya.finance, standard AAOIFI
              (Accounting and Auditing Organization for Islamic Financial
              Institutions). Mis a jour trimestriellement.
            </p>
            <p>
              <strong>Methode :</strong> Les actions non-conformes sont exclues
              de l'indice. Les poids des actions restantes sont redistribues
              pro-rata pour que le total fasse 100%. Les actions "doubtful"
              (questionable) sont incluses car considerees investissables selon
              Zoya/AAOIFI.
            </p>
            <p>
              <strong>Disclaimer :</strong> Cet outil est fourni a titre
              informatif uniquement. Il ne constitue pas un conseil en
              investissement. Consultez un conseiller financier qualifie et un
              scholar islamique avant d'investir.
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="border-t bg-white py-6 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-400">
          NASDAQ 100 Halal — Donnees mises a jour le {data.date} — Standard
          AAOIFI
        </div>
      </footer>
    </div>
  );
}
