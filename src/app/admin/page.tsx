"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Construction,
  Lightbulb,
  MapPin,
  Search,
  Trash2,
  Filter,
  BarChart3,
  Bell,
  Download,
  RefreshCw,
  Users,
  TrendingUp,
  Calendar,
  Eye,
  MessageSquare,
  Star,
  User,
  ExternalLink,
  DollarSign,
  Camera,
  Navigation,
  FileText,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Issue {
  id: string
  type: "pothole" | "streetlight" | "garbage" | "manhole"
  title: string
  description: string
  status: "active" | "in-progress" | "resolved"
  location: string
  coordinates?: { lat: number; lng: number }
  reportedAt: string
  assignedTo: string
  assigneeAvatar?: string
  estimatedCost?: number
  citizenReports?: number
  images?: number
  lastUpdate?: string
  resolvedAt?: string
  progressNotes?: string
  resolutionNotes?: string
}

interface StatsOverviewProps {
  totalIssues: number
  activeIssues: number
  resolvedIssues: number
  inProgressIssues: number
}

interface IssueCardProps {
  issue: Issue
}

interface IssueChartProps {
  issues: Issue[]
}

function StatsOverview({ totalIssues, activeIssues, resolvedIssues, inProgressIssues }: StatsOverviewProps) {
  const stats = [
    {
      title: "Total Issues",
      value: totalIssues,
      icon: BarChart3,
      color: "text-foreground",
      bgGradient: "from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Active Issues",
      value: activeIssues,
      icon: AlertTriangle,
      color: "text-destructive",
      bgGradient: "from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50",
      iconBg: "bg-destructive/10",
      iconColor: "text-destructive",
    },
    {
      title: "In Progress",
      value: inProgressIssues,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bgGradient: "from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Resolved",
      value: resolvedIssues,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bgGradient: "from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className={`shadow-medium border-0 bg-gradient-to-br ${stat.bgGradient} hover:shadow-strong transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-xl ${stat.iconBg} shadow-soft`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1 mt-2">
              <div
                className={`h-1 rounded-full transition-all duration-1000 ease-out ${
                  stat.title === "Active Issues"
                    ? "bg-destructive"
                    : stat.title === "In Progress"
                      ? "bg-amber-500"
                      : stat.title === "Resolved"
                        ? "bg-emerald-500"
                        : "bg-primary"
                }`}
                style={{
                  width: `${Math.min((stat.value / Math.max(totalIssues, 1)) * 100, 100)}%`,
                  animationDelay: `${index * 200 + 500}ms`,
                }}
              ></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

type IssueChartData = {
  type: string
  count: number
  active: number
  resolved: number
  inProgress: number
}

function IssueChart({ issues }: IssueChartProps) {
  // Prepare data for bar chart (issues by type)
    const typeData = issues.reduce<IssueChartData[]>((acc, issue) => {

    const existing = acc.find((item) => item.type === issue.type)
    if (existing) {
      existing.count += 1
      if (issue.status === "active") existing.active += 1
      if (issue.status === "resolved") existing.resolved += 1
      if (issue.status === "in-progress") existing.inProgress += 1
    } else {
      acc.push({
        type: issue.type.charAt(0).toUpperCase() + issue.type.slice(1),
        count: 1,
        active: issue.status === "active" ? 1 : 0,
        resolved: issue.status === "resolved" ? 1 : 0,
        inProgress: issue.status === "in-progress" ? 1 : 0,
      })
    }
    return acc
  }, [])

  return (
    <Card className="shadow-medium border-0 bg-gradient-to-br from-card to-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Issues by Category</CardTitle>
        <CardDescription>Distribution of issues across different infrastructure types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-white/50 dark:bg-black/20 rounded-xl p-4 shadow-soft">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={typeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.01 160)" />
              <XAxis
                dataKey="type"
                tick={{ fill: "oklch(0.45 0.02 160)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.90 0.01 160)" }}
              />
              <YAxis
                tick={{ fill: "oklch(0.45 0.02 160)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.90 0.01 160)" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(1 0 0)",
                  border: "1px solid oklch(0.90 0.01 160)",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Bar dataKey="active" stackId="a" fill="oklch(0.577 0.245 27.325)" name="Active" radius={[0, 0, 0, 0]} />
              <Bar
                dataKey="inProgress"
                stackId="a"
                fill="oklch(0.70 0.15 60)"
                name="In Progress"
                radius={[0, 0, 0, 0]}
              />
              <Bar dataKey="resolved" stackId="a" fill="oklch(0.60 0.15 150)" name="Resolved" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function IssueCard({ issue }: IssueCardProps) {
  const typeIcons = {
    pothole: Construction,
    streetlight: Lightbulb,
    garbage: Trash2,
    manhole: MapPin,
  }

  const statusColors = {
    active: "bg-red-500 text-white",
    "in-progress": "bg-amber-500 text-white",
    resolved: "bg-emerald-500 text-white",
  }

  const statusIcons = {
    active: AlertTriangle,
    "in-progress": Clock,
    resolved: CheckCircle,
  }

  const typeColors = {
    pothole: "from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20",
    streetlight: "from-yellow-50 to-yellow-100 dark:from-yellow-950/20 dark:to-yellow-900/20",
    garbage: "from-slate-50 to-slate-100 dark:from-slate-950/20 dark:to-slate-900/20",
    manhole: "from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20",
  }

  const TypeIcon = typeIcons[issue.type]
  const StatusIcon = statusIcons[issue.status]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card
      className={`shadow-lg border-0 bg-gradient-to-br ${typeColors[issue.type]} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden relative`}
    >
      <CardHeader className="pb-4 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg text-balance group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                  {issue.title}
                </h3>
                <Badge variant="outline" className="text-xs font-mono bg-white/50 dark:bg-slate-800/50">
                  {issue.id}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {issue.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[issue.status]}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {issue.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <p className="text-slate-700 dark:text-slate-300 text-pretty leading-relaxed">{issue.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {issue.estimatedCost && (
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Est. Cost</span>
              </div>
              <div className="font-semibold text-emerald-600">{formatCurrency(issue.estimatedCost)}</div>
            </div>
          )}

          {issue.citizenReports && (
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Reports</span>
              </div>
              <div className="font-semibold text-blue-600">{issue.citizenReports}</div>
            </div>
          )}

          {issue.images && (
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Images</span>
              </div>
              <div className="font-semibold text-purple-600">{issue.images}</div>
            </div>
          )}

          {issue.coordinates && (
            <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">GPS</span>
              </div>
              <div className="font-semibold text-amber-600 text-xs">
                {issue.coordinates.lat.toFixed(4)}, {issue.coordinates.lng.toFixed(4)}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 rounded-lg p-4 shadow-sm backdrop-blur-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8 border-2 border-slate-200 dark:border-slate-700">
                <AvatarImage src={issue.assigneeAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-slate-600 text-white text-xs font-semibold">
                  {getInitials(issue.assignedTo)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{issue.assignedTo}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Assigned Engineer</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-600 dark:text-slate-400">Reported</div>
              <div className="text-sm font-medium">{formatDate(issue.reportedAt)}</div>
            </div>
          </div>

          {issue.lastUpdate && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
              <TrendingUp className="w-3 h-3" />
              <span>Last updated: {formatDate(issue.lastUpdate)}</span>
            </div>
          )}
        </div>

        {issue.progressNotes && issue.status === "in-progress" && (
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 shadow-sm border border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-amber-600" />
              <span className="font-medium text-amber-800 dark:text-amber-300 text-sm">Progress Update</span>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-400">{issue.progressNotes}</p>
          </div>
        )}

        {issue.resolvedAt && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 shadow-sm border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                Resolved: {formatDate(issue.resolvedAt)}
              </span>
            </div>
            {issue.resolutionNotes && (
              <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-2">{issue.resolutionNotes}</p>
            )}
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {issue.status === "active" && (
            <>
              <Button
                size="sm"
                className="flex-1 shadow-md bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white"
              >
                <User className="w-4 h-4 mr-2" />
                Assign Worker
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 shadow-md hover:shadow-lg transition-all border-slate-300 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400 bg-transparent"
              >
                <Clock className="w-4 h-4 mr-2" />
                Start Progress
              </Button>
            </>
          )}
          {issue.status === "in-progress" && (
            <>
              <Button
                size="sm"
                className="flex-1 shadow-md bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Resolved
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="shadow-md hover:shadow-lg transition-all border-slate-300 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400 bg-transparent"
              >
                <FileText className="w-4 h-4 mr-2" />
                Update
              </Button>
            </>
          )}
          {issue.status === "resolved" && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 shadow-md hover:shadow-lg transition-all border-slate-300 dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400 bg-transparent"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Report
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced mock data with more professional details
const mockIssues = [
  {
    id: "SNF-2024-001",
    type: "pothole" as const,
    title: "Critical Infrastructure Damage - Main Street Corridor",
    description:
      "Large pothole (approx. 3ft diameter) causing significant vehicle damage. Multiple citizen reports received. Requires immediate attention due to high traffic volume.",
    status: "active" as const,
    location: "123 Main St, Downtown District",
    coordinates: { lat: 40.7128, lng: -74.006 },
    reportedAt: "2024-01-15T10:30:00Z",
    assignedTo: "John Smith",
    assigneeAvatar: "/diverse-engineers-meeting.png",
    estimatedCost: 2500,
    citizenReports: 12,
    images: 3,
    lastUpdate: "2024-01-15T14:20:00Z",
  },
  {
    id: "SNF-2024-002",
    type: "streetlight" as const,
    title: "Safety Hazard - Oak Avenue Lighting Failure",
    description:
      "Complete lighting failure affecting 200m stretch. Safety concern for pedestrians and vehicles during evening hours. Electrical inspection required.",
    status: "in-progress" as const,
    location: "456 Oak Ave, Residential Zone",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    reportedAt: "2024-01-14T14:20:00Z",
    assignedTo: "Sarah Johnson",
    assigneeAvatar: "/electrician-working.png",
    estimatedCost: 1800,
    citizenReports: 8,
    images: 2,
    lastUpdate: "2024-01-15T09:15:00Z",
    progressNotes: "Electrical team dispatched. Parts ordered.",
  },
  {
    id: "SNF-2024-003",
    type: "garbage" as const,
    title: "Waste Management - Pine Street Collection Point",
    description:
      "Overflowing public waste receptacle causing sanitation concerns. Attracting pests and creating unpleasant odors for nearby businesses.",
    status: "resolved" as const,
    location: "789 Pine St, Commercial District",
    coordinates: { lat: 40.7505, lng: -73.9934 },
    reportedAt: "2024-01-13T09:15:00Z",
    assignedTo: "Mike Davis",
    assigneeAvatar: "/sanitation.jpg",
    estimatedCost: 150,
    citizenReports: 5,
    images: 1,
    resolvedAt: "2024-01-14T16:45:00Z",
    resolutionNotes: "Waste collected, receptacle cleaned and sanitized.",
  },
  {
    id: "SNF-2024-004",
    type: "manhole" as const,
    title: "Infrastructure Safety - Elm Street Access Point",
    description:
      "Damaged manhole cover with visible cracks. Poses significant safety risk to pedestrians and vehicles. Requires immediate structural assessment.",
    status: "active" as const,
    location: "321 Elm St, Historic District",
    coordinates: { lat: 40.7282, lng: -74.0776 },
    reportedAt: "2024-01-12T11:00:00Z",
    assignedTo: "Lisa Wilson",
    assigneeAvatar: "/inspector.png",
    estimatedCost: 3200,
    citizenReports: 15,
    images: 4,
    lastUpdate: "2024-01-15T11:30:00Z",
  },
]

const issueTypes = [
  { value: "all", label: "All Issues", icon: BarChart3, color: "text-slate-600" },
  { value: "pothole", label: "Potholes", icon: Construction, color: "text-amber-600" },
  { value: "streetlight", label: "Streetlights", icon: Lightbulb, color: "text-yellow-600" },
  { value: "garbage", label: "Garbage", icon: Trash2, color: "text-slate-600" },
  { value: "manhole", label: "Manholes", icon: MapPin, color: "text-blue-600" },
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || issue.type === selectedType
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  const activeIssues = mockIssues.filter((issue) => issue.status === "active")
  const resolvedIssues = mockIssues.filter((issue) => issue.status === "resolved")
  const inProgressIssues = mockIssues.filter((issue) => issue.status === "in-progress")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-15 h-15  flex items-center justify-center ">
                  <Image src="/logo-new.png" alt="SnapFix logo" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                    SnapFix Admin
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
                    Civic Infrastructure Management
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4 ml-8">
                <Badge
                  variant="outline"
                  className="border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  98.2% Uptime
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-300 text-blue-700 dark:border-blue-600 dark:text-blue-300 bg-blue-50/50 dark:bg-blue-950/50"
                >
                  <Users className="w-3 h-3 mr-1" />
                  24 Active Teams
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-[8px] text-white font-bold">{activeIssues.length}</span>
                  </div>
                </div>
                <Avatar className="w-8 h-8 border-2 border-slate-200 dark:border-slate-700">
                  <AvatarImage src="/admin-interface.png" />
                  <AvatarFallback className="bg-slate-600 text-white text-xs font-semibold">AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                System Status: Operational
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last Updated: {lastRefresh.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <StatsOverview
            totalIssues={mockIssues.length}
            activeIssues={activeIssues.length}
            resolvedIssues={resolvedIssues.length}
            inProgressIssues={inProgressIssues.length}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 shadow-lg rounded-2xl overflow-hidden">
            <IssueChart issues={mockIssues} />
          </div>
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  Resolution Rate
                </CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-2">
                    {Math.round((resolvedIssues.length / mockIssues.length) * 100)}%
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Average resolution rate</p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-slate-500 to-slate-700 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${Math.round((resolvedIssues.length / mockIssues.length) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span>Target: 85%</span>
                    <span>Current: {Math.round((resolvedIssues.length / mockIssues.length) * 100)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  Citizen Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total Reports</span>
                    <span className="font-semibold">
                      {mockIssues.reduce((sum, issue) => sum + (issue.citizenReports || 0), 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Avg. Response Time</span>
                    <span className="font-semibold text-emerald-600">2.4 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Satisfaction Score</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">4.8/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8 shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-md">
                <Filter className="w-5 h-5 text-white" />
              </div>
              Advanced Filters & Search
              <Badge
                variant="secondary"
                className="ml-auto bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {filteredIssues.length} results
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-300 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 bg-white dark:bg-slate-800"
                />
              </div>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Issue Type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className={`w-4 h-4 ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="resolved">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      Resolved
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 shadow-lg bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">All Issues</span>
              <Badge variant="secondary" className="ml-1 bg-slate-200 dark:bg-slate-600 text-xs">
                {filteredIssues.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              <AlertTriangle className="w-4 h-4" />
              <span className="hidden sm:inline">Active</span>
              <Badge variant="secondary" className="ml-1 bg-slate-200 dark:bg-slate-600 text-xs">
                {activeIssues.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">In Progress</span>
              <Badge variant="secondary" className="ml-1 bg-slate-200 dark:bg-slate-600 text-xs">
                {inProgressIssues.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-100 rounded-xl transition-all duration-200 font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Resolved</span>
              <Badge variant="secondary" className="ml-1 bg-slate-200 dark:bg-slate-600 text-xs">
                {resolvedIssues.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredIssues.length === 0 ? (
              <Card className="shadow-md border-0 bg-slate-50 dark:bg-slate-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Eye className="w-12 h-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">No issues found</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-500 text-center">
                    Try adjusting your filters or search terms to find what you&apos;re looking for.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredIssues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeIssues
              .filter((issue) => {
                const matchesSearch =
                  issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  issue.location.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesType = selectedType === "all" || issue.type === selectedType
                return matchesSearch && matchesType
              })
              .map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {inProgressIssues
              .filter((issue) => {
                const matchesSearch =
                  issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  issue.location.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesType = selectedType === "all" || issue.type === selectedType
                return matchesSearch && matchesType
              })
              .map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {resolvedIssues
              .filter((issue) => {
                const matchesSearch =
                  issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  issue.location.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesType = selectedType === "all" || issue.type === selectedType
                return matchesSearch && matchesType
              })
              .map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
