'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Top40Stats, YearOfRelease, ArtistByCountry, ArtistByRegion, ArtistByGenre } from '@/lib/top40-stats';

interface StatsDisplayProps {
  stats: Top40Stats;
}

// Color palette for charts (theme-aware)
const getChartColors = (isDark: boolean) => {
  if (isDark) {
    return [
      '#10b981', // green
      '#f59e0b', // amber
      '#3b82f6', // blue
      '#ef4444', // red
      '#8b5cf6', // purple
      '#ec4899', // pink
      '#06b6d4', // cyan
      '#84cc16', // lime
      '#f97316', // orange
      '#6366f1', // indigo
      '#14b8a6', // teal
      '#a855f7', // violet
    ];
  } else {
    return [
      '#059669', // green
      '#d97706', // amber
      '#2563eb', // blue
      '#dc2626', // red
      '#7c3aed', // purple
      '#db2777', // pink
      '#0891b2', // cyan
      '#65a30d', // lime
      '#ea580c', // orange
      '#4f46e5', // indigo
      '#0d9488', // teal
      '#9333ea', // violet
    ];
  }
};

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode on mount
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mediaQuery.matches);
        
        // Listen for changes
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
      }
    };
    
    checkDarkMode();
    
    // Also check for dark class on html element (in case theme is set via class)
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const colors = getChartColors(isDark);

  // Calculate average and median for Year of Release
  const calculateYearStats = (years: YearOfRelease[]) => {
    const total = years.reduce((sum, item) => sum + item.count, 0);
    const weightedSum = years.reduce((sum, item) => sum + (item.year * item.count), 0);
    const average = Math.round(weightedSum / total);
    
    const sortedYears = years.flatMap(item => 
      Array(item.count).fill(item.year)
    ).sort((a, b) => a - b);
    const median = sortedYears.length % 2 === 0
      ? Math.round((sortedYears[sortedYears.length / 2 - 1] + sortedYears[sortedYears.length / 2]) / 2)
      : sortedYears[Math.floor(sortedYears.length / 2)];
    
    return { average, median, total };
  };

  // Calculate percentage for each item
  const calculatePercentage = (count: number, total: number) => {
    return Math.round((count / total) * 100);
  };

  // Format data for pie chart
  const formatPieData = (data: Array<{ count: number; [key: string]: any }>, labelKey: string) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return data.map((item, index) => ({
      name: item[labelKey],
      value: item.count,
      percentage: calculatePercentage(item.count, total),
      color: colors[index % colors.length],
    }));
  };

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        Stats
      </h2>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 space-y-8">
        {/* Year of Release */}
        {stats.yearOfRelease && stats.yearOfRelease.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Year of Release
            </h3>
            {(() => {
              const yearStats = calculateYearStats(stats.yearOfRelease);
              const pieData = formatPieData(stats.yearOfRelease, 'year');
              const recentYears = stats.yearOfRelease
                .filter(y => y.year >= 2023 && y.year <= 2025)
                .reduce((sum, y) => sum + y.count, 0);
              const recentPercentage = calculatePercentage(recentYears, yearStats.total);
              
              return (
                <>
                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827',
                          }}
                          formatter={(value: number, name: string, props: any) => [
                            `${value} (${props.payload.percentage}%)`,
                            name,
                          ]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {yearStats.average}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Avg Year</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Median: {yearStats.median}
                      </div>
                    </div>
                    <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
                      Past 3 Years (2023-2025): {recentYears} ({recentPercentage}%)
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Year</th>
                          <th className="text-right p-2 text-gray-900 dark:text-white font-semibold">Count</th>
                          <th className="text-right p-2 text-gray-900 dark:text-white font-semibold">%</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.yearOfRelease
                          .sort((a, b) => b.year - a.year)
                          .map((item, index) => {
                            const percentage = calculatePercentage(item.count, yearStats.total);
                            return (
                              <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="p-2 text-gray-900 dark:text-white">{item.year}</td>
                                <td className="p-2 text-right text-gray-700 dark:text-gray-300">{item.count}</td>
                                <td className="p-2 text-right text-gray-700 dark:text-gray-300">{percentage}%</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Artists by Country */}
        {stats.artistsByCountry && stats.artistsByCountry.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Artists by Country
            </h3>
            {(() => {
              const total = stats.artistsByCountry.reduce((sum, item) => sum + item.count, 0);
              const pieData = formatPieData(stats.artistsByCountry, 'country');
              
              return (
                <>
                  <div className="mb-6">
                    <div className="text-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                      {total} of {total} artists have country data
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827',
                          }}
                          formatter={(value: number, name: string, props: any) => [
                            `${value} (${props.payload.percentage}%)`,
                            name,
                          ]}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '20px' }}
                          formatter={(value, entry: any) => (
                            <span style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
                              {value}: {entry.payload.value} ({entry.payload.percentage}%)
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Country</th>
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.artistsByCountry
                          .sort((a, b) => b.count - a.count)
                          .map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-2">
                                <div className="flex items-center gap-2">
                                  {item.flag && (
                                    <img
                                      src={item.flag}
                                      alt={item.country}
                                      className="w-6 h-6 object-cover rounded"
                                    />
                                  )}
                                  <span className="text-gray-900 dark:text-white font-medium">{item.country}</span>
                                </div>
                              </td>
                              <td className="p-2 text-gray-700 dark:text-gray-300">
                                {item.artists.join(', ')}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Artists by Region */}
        {stats.artistsByRegion && stats.artistsByRegion.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Artists by Region
            </h3>
            {(() => {
              const pieData = formatPieData(stats.artistsByRegion, 'region');
              
              return (
                <>
                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827',
                          }}
                          formatter={(value: number, name: string, props: any) => [
                            `${value} (${props.payload.percentage}%)`,
                            name,
                          ]}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '20px' }}
                          formatter={(value, entry: any) => (
                            <span style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
                              {value}: {entry.payload.value} ({entry.payload.percentage}%)
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Region</th>
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.artistsByRegion
                          .sort((a, b) => b.count - a.count)
                          .map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-2 text-gray-900 dark:text-white font-medium">{item.region}</td>
                              <td className="p-2 text-gray-700 dark:text-gray-300">
                                {item.artists.join(', ')}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Artists by Genre */}
        {stats.artistsByGenre && stats.artistsByGenre.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Artists by Genre
            </h3>
            {(() => {
              const pieData = formatPieData(stats.artistsByGenre, 'genre');
              
              return (
                <>
                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDark ? '#1f2937' : '#ffffff',
                            border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                            borderRadius: '8px',
                            color: isDark ? '#f3f4f6' : '#111827',
                          }}
                          formatter={(value: number, name: string, props: any) => [
                            `${value} (${props.payload.percentage}%)`,
                            name,
                          ]}
                        />
                        <Legend
                          wrapperStyle={{ paddingTop: '20px' }}
                          formatter={(value, entry: any) => (
                            <span style={{ color: isDark ? '#f3f4f6' : '#111827' }}>
                              {value}: {entry.payload.value} ({entry.payload.percentage}%)
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Genre</th>
                          <th className="text-left p-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.artistsByGenre
                          .sort((a, b) => b.count - a.count)
                          .map((item, index) => (
                            <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="p-2 text-gray-900 dark:text-white font-medium">{item.genre}</td>
                              <td className="p-2 text-gray-700 dark:text-gray-300">
                                {item.artists.join(', ')}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}

