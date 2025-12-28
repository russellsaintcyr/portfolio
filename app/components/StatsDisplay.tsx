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
  const [isMobile, setIsMobile] = useState(false);

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
    
    // Check for mobile view
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        setIsMobile(mediaQuery.matches);
        
        // Listen for changes
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
      }
    };
    
    checkDarkMode();
    checkMobile();
    
    // Also check for dark class on html element (in case theme is set via class)
    const htmlElement = document.documentElement;
    if (htmlElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const colors = getChartColors(isDark);

  // Calculate total for Year of Release
  const calculateYearStats = (years: YearOfRelease[]) => {
    const total = years.reduce((sum, item) => sum + item.count, 0);
    return { total };
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
        Nerdy Stats
      </h2>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 space-y-12">
        {/* Year of Release */}
        {stats.yearOfRelease && stats.yearOfRelease.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
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
                  <div className="mb-1">
                    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={!isMobile ? ({ name, payload }) => {
                            const percentage = payload?.percentage || 0;
                            return `${name}: ${percentage}%`;
                          } : false}
                          labelLine={!isMobile}
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
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          itemStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          labelStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          formatter={(value: number | undefined, name: string | undefined, props: any) => {
                            const val = value || 0;
                            const percentage = props?.payload?.percentage || 0;
                            return [`${val} (${percentage}%)`, name || ''];
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {isMobile && (
                      <div className="mt-1 flex flex-wrap justify-center gap-2">
                        {pieData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-1.5 leading-tight">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {entry.name}: {entry.value} ({entry.percentage}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* <div className="text-center mt-1 text-gray-700 dark:text-gray-300">
                      Past 3 Years (2023-2025): {recentYears} ({recentPercentage}%)
                    </div> */}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Artists by Country */}
        {stats.artistsByCountry && stats.artistsByCountry.length > 0 && (
          <>
            <hr className="border-gray-200 dark:border-gray-700 my-8" />
            <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
              Artists by Country
            </h3>
            {(() => {
              const total = stats.artistsByCountry.reduce((sum, item) => sum + item.count, 0);
              const pieData = formatPieData(stats.artistsByCountry, 'country');
              
              return (
                <>
                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={isMobile ? 300 : 375}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={!isMobile ? ({ name, payload }) => {
                            const percentage = payload?.percentage || 0;
                            return `${name}: ${percentage}%`;
                          } : false}
                          labelLine={!isMobile}
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
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          itemStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          labelStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          formatter={(value: number | undefined, name: string | undefined, props: any) => {
                            const val = value || 0;
                            const percentage = props?.payload?.percentage || 0;
                            return [`${val} (${percentage}%)`, name || ''];
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {isMobile && (
                      <div className="mt-1 flex flex-wrap justify-center gap-2">
                        {pieData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-1.5 leading-tight">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {entry.name}: {entry.value} ({entry.percentage}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Country</th>
                          <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.artistsByCountry
                          .sort((a, b) => b.count - a.count)
                          .map((item, index) => (
                            <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 1 ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                              <td className="pl-2 pr-3 py-2">
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
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                {item.artists.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join(', ')}
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
          </>
        )}

        {/* Artists by Region */}
        {stats.artistsByRegion && stats.artistsByRegion.length > 0 && (
          <>
            <hr className="border-gray-200 dark:border-gray-700 my-8" />
            <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
              Artists by Region
            </h3>
            {(() => {
              const pieData = formatPieData(stats.artistsByRegion, 'region');
              
              return (
                <>
                  <div className="mb-6">
                    <ResponsiveContainer width="100%" height={isMobile ? 300 : 375}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={!isMobile ? ({ name, payload }) => {
                            const percentage = payload?.percentage || 0;
                            return `${name}: ${percentage}%`;
                          } : false}
                          labelLine={!isMobile}
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
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          itemStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          labelStyle={{
                            color: isDark ? '#ffffff' : '#111827',
                          }}
                          formatter={(value: number | undefined, name: string | undefined, props: any) => {
                            const val = value || 0;
                            const percentage = props?.payload?.percentage || 0;
                            return [`${val} (${percentage}%)`, name || ''];
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    {isMobile && (
                      <div className="mt-1 flex flex-wrap justify-center gap-2">
                        {pieData.map((entry, index) => (
                          <div key={index} className="flex items-center gap-1.5 leading-tight">
                            <div
                              className="w-4 h-4 rounded"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {entry.name}: {entry.value} ({entry.percentage}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Region</th>
                          <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.artistsByRegion
                          .sort((a, b) => b.count - a.count)
                          .map((item, index) => (
                            <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 1 ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                              <td className="pl-2 pr-3 py-2 text-gray-900 dark:text-white font-medium">{item.region}</td>
                              <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                {item.artists.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join(', ')}
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
          </>
        )}

        {/* Artists by Genre */}
        {stats.artistsByGenre && stats.artistsByGenre.length > 0 && (
          <>
            <hr className="border-gray-200 dark:border-gray-700 my-8" />
            <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1 text-center">
              Artists by Genre/Tags
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Genre</th>
                    <th className="text-left px-3 py-2 text-gray-900 dark:text-white font-semibold">Artists</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.artistsByGenre
                    .sort((a, b) => b.count - a.count)
                    .map((item, index) => (
                      <tr key={index} className={`border-b border-gray-100 dark:border-gray-800 ${index % 2 === 1 ? 'bg-gray-200 dark:bg-gray-700' : ''}`}>
                        <td className="pl-2 pr-3 py-2 text-gray-900 dark:text-white font-medium">{item.genre}</td>
                        <td className="px-3 py-2 text-gray-700 dark:text-gray-300">
                          {item.artists.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join(', ')}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            </div>
          </>
        )}
        <div className="text-center text-gray-700 dark:text-gray-300 text-sm">Musician metadata provided by MusicBrainz</div>
      </div>
    </div>
  );
}

