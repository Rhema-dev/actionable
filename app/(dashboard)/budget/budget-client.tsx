"use client";
import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Switch } from "@/components/ui/switch";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import type { Income, Expense } from "@/types/database";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";
import { Plus, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths, eachMonthOfInterval } from "date-fns";

const EXPENSE_CATEGORIES = ["Software", "PC Fund", "Marketing", "Assets", "Subscriptions", "Other"];
const PAYMENT_TYPES = ["Project Payment", "Deposit", "Final Payment", "Bonus", "Retainer", "Other"];
const PIE_COLORS = ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

const EMPTY_INCOME = { amount: "", project_id: "", payment_type: "Project Payment", date: format(new Date(), "yyyy-MM-dd"), description: "" };
const EMPTY_EXPENSE = { amount: "", category: "Software", description: "", date: format(new Date(), "yyyy-MM-dd"), is_pc_fund_contribution: false, recurring: false };

interface BudgetClientProps {
  initialIncome: Income[];
  initialExpenses: Expense[];
  projects: { id: string; client_name: string }[];
  userId: string;
  monthlyGoal: number;
}

export function BudgetClient({ initialIncome, initialExpenses, projects, userId, monthlyGoal }: BudgetClientProps) {
  const [income, setIncome] = useState<Income[]>(initialIncome);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [monthFilter, setMonthFilter] = useState(format(new Date(), "yyyy-MM"));
  const [showIncomeSheet, setShowIncomeSheet] = useState(false);
  const [showExpenseSheet, setShowExpenseSheet] = useState(false);
  const [incomeForm, setIncomeForm] = useState(EMPTY_INCOME);
  const [expenseForm, setExpenseForm] = useState({ ...EMPTY_EXPENSE });
  const [saving, setSaving] = useState(false);

  const filteredIncome = income.filter((i) => i.date.startsWith(monthFilter));
  const filteredExpenses = expenses.filter((e) => e.date.startsWith(monthFilter));
  const totalIncome = filteredIncome.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = filteredExpenses.reduce((s, e) => s + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;
  const margin = totalIncome > 0 ? Math.round((netProfit / totalIncome) * 100) : 0;

  // Expense breakdown
  const expByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    filteredExpenses.forEach((e) => { map[e.category] = (map[e.category] ?? 0) + e.amount; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredExpenses]);

  // 6-month trend
  const sixMonths = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = subMonths(new Date(), 5 - i);
      const key = format(d, "yyyy-MM");
      const rev = income.filter((x) => x.date.startsWith(key)).reduce((s, x) => s + x.amount, 0);
      const exp = expenses.filter((x) => x.date.startsWith(key)).reduce((s, x) => s + x.amount, 0);
      return { month: format(d, "MMM"), revenue: rev, profit: rev - exp };
    });
  }, [income, expenses]);

  const saveIncome = async () => {
    if (!incomeForm.amount) { toast.error("Amount required"); return; }
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("income").insert({
      user_id: userId,
      amount: parseFloat(incomeForm.amount),
      project_id: incomeForm.project_id || null,
      payment_type: incomeForm.payment_type,
      date: incomeForm.date,
      description: incomeForm.description || null,
    }).select("*, projects(client_name)").single();
    if (error) { toast.error(error.message); } else {
      setIncome((prev) => [data, ...prev]);
      toast.success("Income logged!");
      setShowIncomeSheet(false);
      setIncomeForm(EMPTY_INCOME);
    }
    setSaving(false);
  };

  const saveExpense = async () => {
    if (!expenseForm.amount || !expenseForm.description) { toast.error("Amount and description required"); return; }
    setSaving(true);
    const supabase = createClient();
    const { data, error } = await supabase.from("expenses").insert({
      user_id: userId,
      amount: parseFloat(expenseForm.amount),
      category: expenseForm.category,
      description: expenseForm.description,
      date: expenseForm.date,
      is_pc_fund_contribution: expenseForm.is_pc_fund_contribution,
      recurring: expenseForm.recurring,
    }).select().single();
    if (error) { toast.error(error.message); } else {
      setExpenses((prev) => [data, ...prev]);
      toast.success("Expense added");
      setShowExpenseSheet(false);
      setExpenseForm({ ...EMPTY_EXPENSE });
    }
    setSaving(false);
  };

  const MonthSelector = () => (
    <Input type="month" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="w-36 h-8 text-xs" />
  );

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6">
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button size="sm" variant="success" onClick={() => setShowIncomeSheet(true)} className="gap-1 h-8">
              <Plus className="h-3.5 w-3.5" /> Log Payment
            </Button>
            <Button size="sm" variant="destructive" onClick={() => setShowExpenseSheet(true)} className="gap-1 h-8">
              <Plus className="h-3.5 w-3.5" /> Add Expense
            </Button>
          </div>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <MonthSelector />
          </div>
          {/* P&L */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-emerald-400" />Revenue</p>
                <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</p>
                <div className="mt-2">
                  <p className="text-xs text-slate-500 mb-1">Goal: {formatCurrency(monthlyGoal)}</p>
                  <Progress value={totalIncome} max={monthlyGoal} barClassName="bg-emerald-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><TrendingDown className="h-3.5 w-3.5 text-red-400" />Expenses</p>
                <p className="text-2xl font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><DollarSign className="h-3.5 w-3.5 text-indigo-400" />Net Profit</p>
                <p className={cn("text-2xl font-bold", netProfit >= 0 ? "text-indigo-400" : "text-red-400")}>{formatCurrency(netProfit)}</p>
                <p className="text-xs text-slate-500 mt-1">{margin}% margin</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Expense breakdown donut */}
            <Card>
              <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
              <CardContent>
                {expByCategory.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">No expenses this month</p>
                ) : (
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width={140} height={140}>
                      <PieChart>
                        <Pie data={expByCategory} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={2}>
                          {expByCategory.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: any) => [formatCurrency(Number(v))]} contentStyle={{ background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px", fontSize: "11px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5">
                      {expByCategory.map((item, i) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                          <span className="text-xs text-slate-400">{item.name}</span>
                          <span className="text-xs font-medium text-slate-300 ml-auto">{formatCurrency(item.value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 6-month trend */}
            <Card>
              <CardHeader><CardTitle>6-Month Profit Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={sixMonths}>
                    <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={(v: any) => [formatCurrency(Number(v))]} contentStyle={{ background: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px", fontSize: "11px" }} />
                    <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue" />
                    <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-4">
          <div className="flex items-center justify-between">
            <MonthSelector />
            <p className="text-lg font-bold text-emerald-400">{formatCurrency(totalIncome)}</p>
          </div>
          <div className="rounded-xl border border-slate-700/60 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800/60">
                <tr className="border-b border-slate-700/40">
                  {["Date", "Client/Project", "Type", "Amount", "Description"].map((h) => <th key={h} className="px-3 py-2.5 text-left font-medium text-slate-400">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredIncome.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-500">No income this month</td></tr>
                ) : filteredIncome.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-800/20">
                    <td className="px-3 py-2.5 text-slate-400">{formatDate(item.date)}</td>
                    <td className="px-3 py-2.5 text-slate-300">{item.projects?.client_name ?? "—"}</td>
                    <td className="px-3 py-2.5"><Badge variant="success">{item.payment_type}</Badge></td>
                    <td className="px-3 py-2.5 font-bold text-emerald-400">{formatCurrency(item.amount)}</td>
                    <td className="px-3 py-2.5 text-slate-500">{item.description ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <MonthSelector />
            <p className="text-lg font-bold text-red-400">{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="rounded-xl border border-slate-700/60 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800/60">
                <tr className="border-b border-slate-700/40">
                  {["Date", "Category", "Description", "Amount", "PC Fund"].map((h) => <th key={h} className="px-3 py-2.5 text-left font-medium text-slate-400">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-8 text-slate-500">No expenses this month</td></tr>
                ) : filteredExpenses.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700/20 hover:bg-slate-800/20">
                    <td className="px-3 py-2.5 text-slate-400">{formatDate(item.date)}</td>
                    <td className="px-3 py-2.5"><Badge variant="gray">{item.category}</Badge></td>
                    <td className="px-3 py-2.5 text-slate-300">{item.description}</td>
                    <td className="px-3 py-2.5 font-bold text-red-400">{formatCurrency(item.amount)}</td>
                    <td className="px-3 py-2.5">{item.is_pc_fund_contribution ? <Badge variant="amber">PC Fund</Badge> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Income Sheet */}
      <Sheet open={showIncomeSheet} onClose={() => setShowIncomeSheet(false)} title="Log Payment">
        <div className="space-y-4">
          <FormField label="Amount ($)" required>
            <Input type="number" placeholder="1500" value={incomeForm.amount} onChange={(e) => setIncomeForm((f) => ({ ...f, amount: e.target.value }))} />
          </FormField>
          <FormField label="Project">
            <Select value={incomeForm.project_id} onChange={(e) => setIncomeForm((f) => ({ ...f, project_id: e.target.value }))}>
              <option value="">— Select project —</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.client_name}</option>)}
            </Select>
          </FormField>
          <FormField label="Payment Type">
            <Select value={incomeForm.payment_type} onChange={(e) => setIncomeForm((f) => ({ ...f, payment_type: e.target.value }))}>
              {PAYMENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </FormField>
          <FormField label="Date">
            <Input type="date" value={incomeForm.date} onChange={(e) => setIncomeForm((f) => ({ ...f, date: e.target.value }))} />
          </FormField>
          <FormField label="Description">
            <Input placeholder="e.g. 50% deposit for SaaS explainer" value={incomeForm.description} onChange={(e) => setIncomeForm((f) => ({ ...f, description: e.target.value }))} />
          </FormField>
          <Button onClick={saveIncome} disabled={saving} className="w-full">{saving ? "Saving…" : "Log Payment"}</Button>
        </div>
      </Sheet>

      {/* Expense Sheet */}
      <Sheet open={showExpenseSheet} onClose={() => setShowExpenseSheet(false)} title="Add Expense">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="Amount ($)" required>
              <Input type="number" placeholder="29" value={expenseForm.amount} onChange={(e) => setExpenseForm((f) => ({ ...f, amount: e.target.value }))} />
            </FormField>
            <FormField label="Category">
              <Select value={expenseForm.category} onChange={(e) => setExpenseForm((f) => ({ ...f, category: e.target.value }))}>
                {EXPENSE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Description" required>
            <Input placeholder="Adobe Creative Cloud subscription" value={expenseForm.description} onChange={(e) => setExpenseForm((f) => ({ ...f, description: e.target.value }))} />
          </FormField>
          <FormField label="Date">
            <Input type="date" value={expenseForm.date} onChange={(e) => setExpenseForm((f) => ({ ...f, date: e.target.value }))} />
          </FormField>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">PC Fund Contribution</span>
            <Switch checked={expenseForm.is_pc_fund_contribution} onCheckedChange={(v) => setExpenseForm((f) => ({ ...f, is_pc_fund_contribution: v }))} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-300">Recurring</span>
            <Switch checked={expenseForm.recurring} onCheckedChange={(v) => setExpenseForm((f) => ({ ...f, recurring: v }))} />
          </div>
          <Button onClick={saveExpense} disabled={saving} className="w-full">{saving ? "Saving…" : "Add Expense"}</Button>
        </div>
      </Sheet>
    </div>
  );
}
