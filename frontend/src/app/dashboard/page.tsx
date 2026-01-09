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
    RefreshCw,
    Settings,
    BarChart3,
    MessageSquare,
    Trophy,
    Star,
    Flame,
    Lightning,
    Sparkles
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
    const [activeTab, setActiveTab] = useState('dashboard');

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

    // Tab content components
    const renderDashboard = () => (
        <>
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Total Leads</span>
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-5xl font-black text-white mb-1">{stats.totalLeads}</div>
                    <div className="text-white/80 text-sm font-medium">All sources</div>
                </div>

                <div className="bg-gradient-to-br from-red-500 via-orange-400 to-yellow-400 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">High Priority</span>
                        <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-5xl font-black text-white mb-1">{stats.highPriority}</div>
                    <div className="text-white/80 text-sm font-medium">Needs attention</div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 via-pink-400 to-rose-400 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">AI Responses</span>
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-5xl font-black text-white mb-1">{stats.aiResponses}</div>
                    <div className="text-white/80 text-sm font-medium">Auto-replied</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Lightning className="w-5 h-5 text-yellow-500" />
                    Quick Actions
                </h3>
                <div className="flex gap-4 flex-wrap">
                    <button
                        onClick={fetchLeads}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Data
                    </button>
                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                        onClick={() => window.open('https://www.facebook.com', '_blank')}
                    >
                        <Facebook className="w-4 h-4" />
                        Test Facebook
                    </button>
                    <button
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                        onClick={() => window.location.href = 'mailto:support@example.com'}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Get Help
                    </button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Recent Leads
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Comment</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">AI Response</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center space-x-3">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDuration: '0.8s' }}></div>
                                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}></div>
                                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDuration: '0.8s', animationDelay: '0.4s' }}></div>
                                            <span className="ml-3 text-gray-600 font-medium">Loading leads...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <TrendingUp className="w-12 h-12 text-gray-300" />
                                            <span className="font-medium">No leads yet. Configure Facebook webhook to start collecting!</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {getSourceIcon(lead.source)}
                                                <span className="capitalize text-sm font-semibold text-gray-700">{lead.source}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-gray-700 font-semibold">{lead.user_id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs truncate text-sm text-gray-600" title={lead.comment_text}>
                                                {lead.comment_text}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="max-w-xs truncate text-sm text-gray-600" title={lead.ai_response}>
                                                {lead.ai_response || <span className="text-gray-400">-</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getPriorityBadge(lead.priority)}>{lead.priority}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 font-medium">{formatTime(lead.timestamp)}</span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

    const renderLeads = () => (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    All Leads ({leads.length})
                </h2>
            </div>
            <div className="p-6">
                {leads.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">No leads available</div>
                ) : (
                    <div className="space-y-3">
                        {leads.map((lead, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all bg-gradient-to-r from-gray-50 to-white">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        {getSourceIcon(lead.source)}
                                        <span className="font-bold text-gray-800">{lead.user_id}</span>
                                        <span className={getPriorityBadge(lead.priority)}>{lead.priority}</span>
                                    </div>
                                    <span className="text-sm text-gray-500 font-medium">{formatTime(lead.timestamp)}</span>
                                </div>
                                <div className="text-gray-700 mb-2 font-medium">{lead.comment_text}</div>
                                {lead.ai_response && (
                                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded-lg border border-green-200">
                                        <span className="font-bold">AI Reply:</span> {lead.ai_response}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderAnalytics = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Performance Overview
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                            <span>Total Processing</span>
                            <span className="font-bold text-2xl">{stats.totalLeads}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                            <span>AI Success Rate</span>
                            <span className="font-bold text-2xl">
                                {stats.totalLeads > 0 ? Math.round((stats.aiResponses / stats.totalLeads) * 100) : 0}%
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                            <span>High Priority Rate</span>
                            <span className="font-bold text-2xl">
                                {stats.totalLeads > 0 ? Math.round((stats.highPriority / stats.totalLeads) * 100) : 0}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Lead Quality
                    </h3>
                    <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-4">
                            <div className="text-sm opacity-80 mb-1">Hot Leads</div>
                            <div className="text-3xl font-black">{leads.filter(l => l.priority === 'High').length}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <div className="text-sm opacity-80 mb-1">Warm Leads</div>
                            <div className="text-3xl font-black">{leads.filter(l => l.priority === 'Medium').length}</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4">
                            <div className="text-sm opacity-80 mb-1">Cold Leads</div>
                            <div className="text-3xl font-black">{leads.filter(l => l.priority === 'Low').length}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Backend
                        </div>
                        <div className="text-sm text-green-600">{BACKEND_URL}</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-blue-700 font-bold mb-1">
                            <Zap className="w-4 h-4" />
                            API Key
                        </div>
                        <div className="text-sm text-blue-600">Configured ✓</div>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-purple-700 font-bold mb-1">
                            <Clock className="w-4 h-4" />
                            Last Update
                        </div>
                        <div className="text-sm text-purple-600">
                            {lastUpdate ? formatTime(lastUpdate.toISOString()) : 'Never'}
                        </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-orange-700 font-bold mb-1">
                            <RefreshCw className="w-4 h-4" />
                            Auto Refresh
                        </div>
                        <div className="text-sm text-orange-600">Every 5 seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6 text-blue-600" />
                System Settings
            </h2>

            <div className="space-y-6">
                <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Backend Configuration</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Backend URL:</span>
                            <span className="font-mono text-blue-600 font-semibold">{BACKEND_URL}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">API Key Status:</span>
                            <span className="font-bold text-green-600">Configured ✓</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Connection:</span>
                            <span className={`font-bold ${error ? 'text-red-600' : 'text-green-600'}`}>
                                {error ? 'Disconnected ✗' : 'Connected ✓'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Facebook Integration</h3>
                    <div className="space-y-3">
                        <div className="text-gray-600 text-sm">
                            Configure your Facebook webhook to start receiving leads:
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs text-gray-700">
                            Webhook URL: {BACKEND_URL}/webhook
                        </div>
                        <button
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                            onClick={() => window.open('https://developers.facebook.com', '_blank')}
                        >
                            Open Facebook Developer Portal
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">Data Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                            onClick={fetchLeads}
                            className="py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh Data
                        </button>
                        <button
                            className="py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                            onClick={() => alert('Export feature coming soon!')}
                        >
                            Export to CSV
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <h3 className="font-bold text-lg text-gray-800 mb-3">About</h3>
                    <div className="text-gray-600 text-sm space-y-2">
                        <p><strong>AI Lead Generator v1.0</strong></p>
                        <p>Automatically capture and respond to Facebook comments with AI-powered lead generation.</p>
                        <p className="text-xs text-gray-500 mt-3">Built with FastAPI, Groq AI, and Next.js</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">AI Lead Dashboard</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {lastUpdate && (
                                <div className="hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm font-medium">
                                    <Clock className="w-4 h-4" />
                                    <span>{formatTime(lastUpdate.toISOString())}</span>
                                </div>
                            )}
                            <button
                                onClick={fetchLeads}
                                className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex max-w-7xl mx-auto">
                {/* Sidebar */}
                <aside className="w-64 min-h-screen bg-white border-r border-gray-200 sticky top-20 hidden md:block">
                    <nav className="p-4 space-y-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' },
                            { id: 'leads', label: 'Leads', icon: Users, color: 'green' },
                            { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'purple' },
                            { id: 'settings', label: 'Settings', icon: Settings, color: 'orange' }
                        ].map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                                            ? `bg-${item.color}-600 text-white shadow-lg`
                                            : `text-gray-600 hover:bg-${item.color}-50 hover:text-${item.color}-600`
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Mobile Tab Navigation */}
                <div className="md:hidden w-full bg-white border-b border-gray-200 sticky top-20 z-40">
                    <div className="flex overflow-x-auto p-2 gap-2">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'blue' },
                            { id: 'leads', label: 'Leads', icon: Users, color: 'green' },
                            { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'purple' },
                            { id: 'settings', label: 'Settings', icon: Settings, color: 'orange' }
                        ].map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${isActive
                                            ? `bg-${item.color}-600 text-white`
                                            : `bg-gray-100 text-gray-600`
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 flex items-center gap-2 font-semibold">
                            <AlertCircle className="w-5 h-5" />
                            {error}
                        </div>
                    )}

                    {/* Success Alert */}
                    {!error && !loading && leads.length > 0 && (
                        <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 flex items-center gap-2 font-semibold">
                            <CheckCircle2 className="w-5 h-5" />
                            System connected successfully! Auto-refreshing every 5 seconds.
                        </div>
                    )}

                    {/* Tab Content */}
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'leads' && renderLeads()}
                    {activeTab === 'analytics' && renderAnalytics()}
                    {activeTab === 'settings' && renderSettings()}

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p className="font-semibold">AI Lead Generator v1.0</p>
                        <p className="mt-1">
                            Status: {error ? <span className="text-red-600 font-bold">Disconnected</span> : <span className="text-green-600 font-bold">Connected ✓</span>}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">Backend: {BACKEND_URL}</p>
                    </div>
                </main>
            </div>
        </div>
    );
}