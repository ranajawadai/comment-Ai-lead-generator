"use client";

import { useState, useEffect } from 'react';
import {
    Home,
    Users,
    Zap,
    TrendingUp,
    Facebook,
    Instagram,
    AlertCircle,
    CheckCircle2,
    Clock,
    RefreshCw
} from 'lucide-react';

interface Lead {
    timestamp: string;
    source: string;
    user_id: string;
    comment_text: string;
    post_id: string;
    priority: string;
    ai_response: string;
}

interface Stats {
    totalLeads: number;
    highPriority: number;
    aiResponses: number;
}

// Get backend URL from environment
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your-secret-api-key-here';

export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [stats, setStats] = useState<Stats>({ totalLeads: 0, highPriority: 0, aiResponses: 0 });
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchLeads = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/leads`, {
                headers: {
                    'X-API-Key': API_KEY,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API Key');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const leadsData = data.leads || [];

            setLeads(leadsData);

            // Calculate stats
            const total = leadsData.length;
            const high = leadsData.filter((lead: Lead) => lead.priority === 'High').length;
            const aiResp = leadsData.filter((lead: Lead) => lead.ai_response && lead.ai_response.trim() !== '').length;

            setStats({
                totalLeads: total,
                highPriority: high,
                aiResponses: aiResp
            });

            setLastUpdate(new Date());
            setError(null);
        } catch (err) {
            console.error('Error fetching leads:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();

        // Auto-refresh every 5 seconds
        const interval = setInterval(fetchLeads, 5000);

        return () => clearInterval(interval);
    }, []);

    const getSourceIcon = (source: string) => {
        if (source.toLowerCase() === 'facebook') {
            return <Facebook className="w-4 h-4 text-blue-500" />;
        } else if (source.toLowerCase() === 'instagram') {
            return <Instagram className="w-4 h-4 text-pink-500" />;
        }
        return <Users className="w-4 h-4 text-gray-400" />;
    };

    const getPriorityBadge = (priority: string) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";

        switch (priority.toLowerCase()) {
            case 'high':
                return `${baseClasses} bg-red-600 text-white`;
            case 'medium':
                return `${baseClasses} bg-yellow-600 text-white`;
            case 'low':
                return `${baseClasses} bg-gray-600 text-white`;
            default:
                return `${baseClasses} bg-slate-600 text-slate-100`;
        }
    };

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Header */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Zap className="w-6 h-6 text-slate-400" />
                            <h1 className="text-2xl font-bold text-white">AI Lead Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                            {lastUpdate && (
                                <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Updated: {formatTime(lastUpdate.toISOString())}</span>
                                </span>
                            )}
                            <button
                                onClick={fetchLeads}
                                className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-slate-950 border-r border-slate-800 sticky top-16">
                    <nav className="p-4 space-y-2">
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-900 border-l-3 border-slate-400 cursor-pointer">
                            <Home className="w-5 h-5" />
                            <span className="font-medium">Dashboard</span>
                        </div>
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-900 cursor-pointer text-slate-400 hover:text-slate-100 transition-colors">
                            <Users className="w-5 h-5" />
                            <span className="font-medium">Leads</span>
                        </div>
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-900 cursor-pointer text-slate-400 hover:text-slate-100 transition-colors">
                            <TrendingUp className="w-5 h-5" />
                            <span className="font-medium">Analytics</span>
                        </div>
                        <div className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-900 cursor-pointer text-slate-400 hover:text-slate-100 transition-colors">
                            <Zap className="w-5 h-5" />
                            <span className="font-medium">Settings</span>
                        </div>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-200">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400 text-sm font-medium">Total Leads</span>
                                <Users className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.totalLeads}</div>
                            <div className="text-xs text-slate-500 mt-1">All sources</div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400 text-sm font-medium">High Priority</span>
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.highPriority}</div>
                            <div className="text-xs text-slate-500 mt-1">Requires attention</div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-slate-400 text-sm font-medium">AI Responses</span>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.aiResponses}</div>
                            <div className="text-xs text-slate-500 mt-1">Sent successfully</div>
                        </div>
                    </div>

                    {/* Leads Table */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800">
                            <h2 className="text-lg font-semibold text-white">Recent Leads</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-950/50">
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Source</th>
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">User</th>
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Comment</th>
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">AI Response</th>
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-400 font-semibold">Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" style={{ animationDuration: '1s' }}></div>
                                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" style={{ animationDuration: '1s', animationDelay: '0.2s' }}></div>
                                                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse" style={{ animationDuration: '1s', animationDelay: '0.4s' }}></div>
                                                    <span className="ml-2 text-slate-400">Loading leads...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : leads.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                                No leads found. Send a webhook to start collecting data.
                                            </td>
                                        </tr>
                                    ) : (
                                        leads.map((lead, index) => (
                                            <tr key={index} className="hover:bg-slate-900/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        {getSourceIcon(lead.source)}
                                                        <span className="capitalize text-sm">{lead.source}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-mono text-slate-300">{lead.user_id}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs truncate text-sm" title={lead.comment_text}>
                                                        {lead.comment_text}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="max-w-xs truncate text-sm text-slate-300" title={lead.ai_response}>
                                                        {lead.ai_response || '-'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={getPriorityBadge(lead.priority)}>{lead.priority}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-slate-400">{formatTime(lead.timestamp)}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center text-sm text-slate-500">
                        <p>AI Lead Dashboard v1.0 • Real-time monitoring active</p>
                        <p className="mt-1">
                            Backend: {error ? <span className="text-red-400">Disconnected</span> : <span className="text-emerald-400">Connected ✓</span>}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">Backend URL: {BACKEND_URL}</p>
                    </div>
                </main>
            </div>
        </div>
    );
}