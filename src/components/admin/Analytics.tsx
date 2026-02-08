import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Users,
  Recycle,
  Download,
} from "lucide-react";

/* ---------------------- Dummy Data Generator ---------------------- */
type CollectionRecord = {
  date: string;
  totalItems: number;
  totalValue: number;
  activeUsers: number;
  co2SavedKg: number;
  categoryCounts: Record<string, number>;
  bins: {
    name: string;
    location: string;
    items: number;
    value: number;
    trend: number;
  }[];
};

function generateDummyData(days: number): CollectionRecord[] {
  const categories = ["Phones", "Batteries", "Laptops", "Cables", "Others"];

  const binsList = [
    { name: "Central Mall Hub", location: "Downtown" },
    { name: "Tech District", location: "Tech Ave" },
    { name: "University Campus", location: "Campus Dr" },
    { name: "Airport Terminal", location: "Airport Way" },
    { name: "Green Park Station", location: "Park Rd" },
    { name: "Metro Station Bin", location: "Metro Line 2" },
    { name: "IT Park Hub", location: "Business Bay" },
    { name: "Shopping Street Bin", location: "Main Market" },
  ];

  const today = new Date();
  const data: CollectionRecord[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const totalItems = Math.floor(400 + Math.random() * 500);
    const totalValue = totalItems * (8 + Math.random() * 12);
    const activeUsers = Math.floor(200 + Math.random() * 300);
    const co2SavedKg = totalItems * (0.45 + Math.random() * 0.3);

    const categoryCounts: Record<string, number> = {};
    let remaining = totalItems;

    categories.forEach((cat, idx) => {
      if (idx === categories.length - 1) {
        categoryCounts[cat] = remaining;
      } else {
        const portion = Math.floor((remaining * (0.1 + Math.random() * 0.25)));
        categoryCounts[cat] = portion;
        remaining -= portion;
      }
    });

    const bins = binsList.map((b) => {
      const items = Math.floor(50 + Math.random() * 200);
      const value = items * (8 + Math.random() * 12);
      const trend = Math.floor(5 + Math.random() * 25);

      return {
        name: b.name,
        location: b.location,
        items,
        value,
        trend,
      };
    });

    data.push({
      date: d.toISOString().split("T")[0],
      totalItems,
      totalValue,
      activeUsers,
      co2SavedKg,
      categoryCounts,
      bins,
    });
  }

  return data;
}

/* ---------------------- Helper Functions ---------------------- */
function formatCurrency(amount: number) {
  return "$" + amount.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function formatNumber(amount: number) {
  return amount.toLocaleString();
}

function getDayLabel(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

/* ---------------------- Component ---------------------- */
export function Analytics() {
  const [period, setPeriod] = useState("7");

  const periodDays = useMemo(() => {
    if (period === "7") return 7;
    if (period === "30") return 30;
    if (period === "90") return 90;
    return 365;
  }, [period]);

  const rawData = useMemo(() => generateDummyData(periodDays), [periodDays]);

  /* ---------------------- Calculations ---------------------- */
  const totals = useMemo(() => {
    const totalItems = rawData.reduce((sum, d) => sum + d.totalItems, 0);
    const totalValue = rawData.reduce((sum, d) => sum + d.totalValue, 0);
    const avgUsers = Math.floor(
      rawData.reduce((sum, d) => sum + d.activeUsers, 0) / rawData.length
    );
    const totalCO2 = rawData.reduce((sum, d) => sum + d.co2SavedKg, 0);

    return {
      totalItems,
      totalValue,
      avgUsers,
      totalCO2,
    };
  }, [rawData]);

  const dailyChart = useMemo(() => {
    const slice = rawData.slice(-7); // always show last 7 days bars
    return slice.map((d) => ({
      day: getDayLabel(d.date),
      value: d.totalItems,
    }));
  }, [rawData]);

  const categoryStats = useMemo(() => {
    const combined: Record<string, number> = {};

    rawData.forEach((d) => {
      Object.entries(d.categoryCounts).forEach(([cat, count]) => {
        combined[cat] = (combined[cat] || 0) + count;
      });
    });

    const total = Object.values(combined).reduce((a, b) => a + b, 0);

    return Object.entries(combined)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [rawData]);

  const topBins = useMemo(() => {
    const binTotals: Record<
      string,
      { name: string; location: string; items: number; value: number; trend: number }
    > = {};

    rawData.forEach((d) => {
      d.bins.forEach((b) => {
        const key = b.name;
        if (!binTotals[key]) {
          binTotals[key] = { ...b };
        } else {
          binTotals[key].items += b.items;
          binTotals[key].value += b.value;
          binTotals[key].trend = Math.round((binTotals[key].trend + b.trend) / 2);
        }
      });
    });

    return Object.values(binTotals)
      .sort((a, b) => b.items - a.items)
      .slice(0, 5)
      .map((b, idx) => ({
        rank: idx + 1,
        name: b.name,
        location: b.location,
        items: b.items,
        value: formatCurrency(b.value),
        trend: `+${b.trend}%`,
      }));
  }, [rawData]);

  const growthRate = useMemo(() => {
    const half = Math.floor(rawData.length / 2);

    const firstHalf = rawData.slice(0, half);
    const secondHalf = rawData.slice(half);

    const sumItems = (arr: CollectionRecord[]) =>
      arr.reduce((sum, d) => sum + d.totalItems, 0);

    const sumValue = (arr: CollectionRecord[]) =>
      arr.reduce((sum, d) => sum + d.totalValue, 0);

    const firstItems = sumItems(firstHalf);
    const secondItems = sumItems(secondHalf);

    const firstValue = sumValue(firstHalf);
    const secondValue = sumValue(secondHalf);

    const itemsGrowth =
      firstItems === 0 ? 0 : Math.round(((secondItems - firstItems) / firstItems) * 100);

    const valueGrowth =
      firstValue === 0 ? 0 : Math.round(((secondValue - firstValue) / firstValue) * 100);

    return {
      itemsGrowth,
      valueGrowth,
      binsGrowth: Math.floor(3 + Math.random() * 8),
    };
  }, [rawData]);

  /* ---------------------- Export ---------------------- */
  const handleExport = () => {
    const exportData = {
      periodDays,
      totals,
      dailyChart,
      categoryStats,
      topBins,
      growthRate,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics_report_${periodDays}_days.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------------- UI ---------------------- */
  return (
    <div className="space-y-6">
      {/* Time Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Performance Analytics</h3>
          <p className="text-sm text-gray-600">Track trends and system performance</p>
        </div>

        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="365">Last Year</option>
          </select>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Recycle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatNumber(totals.totalItems)}
          </div>
          <div className="text-sm text-gray-600 mb-2">Total Items Recycled</div>
          <div className="text-sm text-green-600 font-medium">
            {growthRate.itemsGrowth >= 0 ? "+" : ""}
            {growthRate.itemsGrowth}% vs previous
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatCurrency(totals.totalValue)}
          </div>
          <div className="text-sm text-gray-600 mb-2">Total Value Processed</div>
          <div className="text-sm text-green-600 font-medium">
            {growthRate.valueGrowth >= 0 ? "+" : ""}
            {growthRate.valueGrowth}% vs previous
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {formatNumber(totals.avgUsers)}
          </div>
          <div className="text-sm text-gray-600 mb-2">Active Users (Avg)</div>
          <div className="text-sm text-green-600 font-medium">+12% vs last period</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totals.totalCO2.toFixed(0)} kg
          </div>
          <div className="text-sm text-gray-600 mb-2">CO₂ Emissions Saved</div>
          <div className="text-sm text-green-600 font-medium">+15% vs last period</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Collection Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
  <h4 className="font-bold text-gray-900 mb-4">Daily Collections</h4>

  {(() => {
    const values = dailyChart.map((d) => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    return (
      <div className="h-64 flex items-end justify-between gap-4">
        {dailyChart.map((item, idx) => {
          // Normalize height (min 20px, max 200px)
          const barPxHeight =
            maxValue === minValue
              ? 120
              : ((item.value - minValue) / (maxValue - minValue)) * 180 + 20;

          return (
            <div key={idx} className="flex-1 flex flex-col items-center">
              {/* Chart area */}
              <div className="w-full h-52 flex flex-col items-center justify-end relative">
                
                {/* Value label */}
                <div
                  className="text-xs font-bold text-gray-700 mb-1"
                >
                  {item.value}
                </div>

                {/* Bar */}
                <div
  className="w-10 md:w-12 rounded-t-xl shadow-lg hover:scale-105 transition-transform duration-200"
  style={{
    height: `${barPxHeight}px`,
    background: "linear-gradient(to top, #2563eb, #60a5fa)",
  }}
  title={`${item.value} items`}
></div>
              </div>

              {/* Day label */}
              <div className="text-xs text-gray-600 font-medium mt-2">
                {item.day}
              </div>
            </div>
          );
        })}
      </div>
    );
  })()}
</div>

        {/* Item Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="font-bold text-gray-900 mb-4">Items by Category</h4>

          <div className="space-y-4">
            {categoryStats.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatNumber(item.count)} items ({item.percentage}%)
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Bins */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-bold text-gray-900 mb-4">Top Performing Bins</h4>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Bin Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Value
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Trend
                </th>
              </tr>
            </thead>

            <tbody>
              {topBins.map((bin) => (
                <tr key={bin.rank} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        bin.rank === 1
                          ? "bg-yellow-400 text-white"
                          : bin.rank === 2
                          ? "bg-gray-300 text-white"
                          : bin.rank === 3
                          ? "bg-orange-400 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {bin.rank}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-medium text-gray-900">{bin.name}</td>
                  <td className="py-3 px-4 text-gray-600">{bin.location}</td>
                  <td className="py-3 px-4 text-gray-900">{formatNumber(bin.items)}</td>
                  <td className="py-3 px-4 font-semibold text-green-600">{bin.value}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {bin.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">This Period</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items Collected</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(totals.totalItems)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(totals.totalValue)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Bins</div>
              <div className="text-2xl font-bold text-blue-600">{45}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-4">Previous Period</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items Collected</div>
              <div className="text-2xl font-bold text-green-600">
                {formatNumber(Math.floor(totals.totalItems * 0.85))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total Value</div>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(Math.floor(totals.totalValue * 0.82))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Active Bins</div>
              <div className="text-2xl font-bold text-green-600">{43}</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-4">Growth Rate</h4>
          <div className="space-y-3">
            <div>
              <div className="text-sm text-gray-600">Items</div>
              <div className="text-2xl font-bold text-purple-600">
                {growthRate.itemsGrowth >= 0 ? "+" : ""}
                {growthRate.itemsGrowth}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Value</div>
              <div className="text-2xl font-bold text-purple-600">
                {growthRate.valueGrowth >= 0 ? "+" : ""}
                {growthRate.valueGrowth}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Bins</div>
              <div className="text-2xl font-bold text-purple-600">
                +{growthRate.binsGrowth}%
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}