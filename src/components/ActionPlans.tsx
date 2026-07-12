import React from "react";
import { ActionItem } from "../types";
import { CheckSquare, Square, AlertCircle, Calendar, Plus, PlayCircle, CheckCircle, HelpCircle } from "lucide-react";

interface ActionPlansProps {
  actions: ActionItem[];
  onToggleStatus: (id: string, currentStatus: ActionItem["status"]) => void;
  onAddAction: (title: string, category: ActionItem["category"]) => void;
}

export default function ActionPlans({ actions, onToggleStatus, onAddAction }: ActionPlansProps) {
  const [newTitle, setNewTitle] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<"health" | "market" | "finance">("health");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddAction(newTitle.trim(), newCategory);
    setNewTitle("");
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "health":
        return "bg-green-50 text-brand-green border-green-100";
      case "market":
        return "bg-amber-50 text-brand-gold border-amber-100";
      case "finance":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6">
        <h2 className="text-xl font-bold text-slate-850 mb-1">Interactive Action Plans</h2>
        <p className="text-sm text-slate-500">
          Personalized daily task checklist synced with your agricultural challenges and AI optimizations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task lists (main column) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 shadow-sm rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800">Recommended Actions Checklist</h3>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
              {actions.filter(a => a.status === "completed").length} / {actions.length} Completed
            </span>
          </div>

          <div className="space-y-3">
            {actions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 font-medium">
                No active actions. Feel free to add custom tasks!
              </div>
            ) : (
              actions.map((action) => (
                <div
                  key={action.id}
                  className={`p-4 rounded-2xl border transition-all flex justify-between items-start gap-3 ${
                    action.status === "completed"
                      ? "bg-slate-50 border-slate-100 opacity-60"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex gap-3 items-start">
                    <button
                      onClick={() => {
                        let next: ActionItem["status"] = "pending";
                        if (action.status === "pending") next = "in-progress";
                        else if (action.status === "in-progress") next = "completed";
                        else next = "pending";
                        onToggleStatus(action.id, next);
                      }}
                      className="text-slate-400 hover:text-brand-green focus:outline-none transition pt-0.5 shrink-0"
                    >
                      {action.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-brand-green" />
                      ) : action.status === "in-progress" ? (
                        <PlayCircle className="h-5 w-5 text-brand-gold" />
                      ) : (
                        <Square className="h-5 w-5 text-slate-300" />
                      )}
                    </button>

                    <div>
                      <span className={`text-sm block leading-relaxed font-semibold ${
                        action.status === "completed" ? "line-through text-slate-400" : "text-slate-800"
                      }`}>
                        {action.title}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">{action.description}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold border uppercase font-mono ${getCategoryBadge(action.category)}`}>
                          {action.category}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono font-medium">
                          <Calendar className="h-3 w-3" /> Due {action.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      action.status === "completed"
                        ? "bg-green-50 text-brand-green border-green-100"
                        : action.status === "in-progress"
                        ? "bg-amber-50 text-brand-gold border-amber-100"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add custom actions / guidelines */}
        <div className="space-y-6">
          {/* Form to add custom actions */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2 flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-brand-green" /> Add Custom Task
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="task-title" className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  id="task-title"
                  placeholder="e.g. Apply fertilizer, order feed, etc."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-850 placeholder-slate-400 focus:border-brand-green focus:ring-brand-green focus:outline-none rounded-xl px-4 py-2.5 text-xs focus:ring-1"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "health", label: "🌱 Health" },
                    { id: "market", label: "📈 Market" },
                    { id: "finance", label: "💰 Finance" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setNewCategory(cat.id as any)}
                      className={`py-2 px-1 text-[11px] rounded-lg border transition ${
                        newCategory === cat.id
                          ? "border-brand-green bg-green-50 text-brand-green font-bold"
                          : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="w-full py-2.5 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl text-xs transition duration-150 active:scale-95 disabled:opacity-50"
              >
                Add Action Item
              </button>
            </form>
          </div>

          {/* Quick coaching guide */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5">
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-brand-gold" /> Operating Guide
            </h3>
            <div className="space-y-3 text-xs text-slate-600 leading-normal">
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
                <span>
                  <strong>Farm Health</strong> tasks concentrate on biological inputs, diagnostics, and climate resilience practices to ensure strong harvest volumes.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5 shrink-0" />
                <span>
                  <strong>Market Insights</strong> tasks protect your profit margins by suggesting hermetic packaging, bulking timing, and buyer contracts.
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span>
                  <strong>Financial Planning</strong> tasks prepare your digital profile for micro-lenders through formal record-keeping.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
