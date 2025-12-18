"use client"

import { useState } from "react"
import Link from "next/link";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Camera,
  Users,
  Search,
  Filter,
  Construction,
  Lightbulb,
  Trash2,
  AlertTriangle,
} from "lucide-react"

interface Issue {
  id: string
  title: string
  category: "pothole" | "manhole" | "streetlight" | "garbage" | "other"
  status: "reported" | "verified" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high" | "critical"
  location: { lat: number; lng: number; address: string }
  reporter: string
  reportedAt: string
  description: string
  image?: string
  votes: number
  comments: number
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Large pothole on Main Street",
    category: "pothole",
    status: "verified",
    priority: "high",
    location: { lat: 40.7128, lng: -74.006, address: "random street address" },
    reporter: "xyz",
    reportedAt: "2024-01-15",
    description: "Deep pothole causing vehicle damage",
    image: "/street-pothole.png",
    votes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "Broken street light",
    category: "streetlight",
    status: "in-progress",
    priority: "medium",
    location: { lat: 40.7589, lng: -73.9851, address: "abc random street" },
    reporter: "mno",
    reportedAt: "2024-01-14",
    description: "Street light flickering and unsafe",
    image: "/broken-street-light.png",
    votes: 12,
    comments: 3,
  },
  {
    id: "3",
    title: "Overflowing garbage bins",
    category: "garbage",
    status: "reported",
    priority: "medium",
    location: { lat: 40.7505, lng: -73.9934, address: "no street" },
    reporter: "jkl mno",
    reportedAt: "2024-01-13",
    description: "Multiple bins overflowing for days",
    image: "/overflowing-garbage-bins.jpg",
    votes: 18,
    comments: 5,
  },
]

const categoryIcons = {
  pothole: Construction,
  manhole: AlertTriangle,
  streetlight: Lightbulb,
  garbage: Trash2,
  other: MapPin,
}

const categoryColors = {
  pothole: "bg-red-100 text-red-800 border-red-200",
  manhole: "bg-yellow-100 text-yellow-800 border-yellow-200",
  streetlight: "bg-blue-100 text-blue-800 border-blue-200",
  garbage: "bg-green-100 text-green-800 border-green-200",
  other: "bg-gray-100 text-gray-800 border-gray-200",
}

const statusColors = {
  reported: "bg-orange-100 text-orange-800",
  verified: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  resolved: "bg-green-100 text-green-800",
}

export default function IssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [showReportForm, setShowReportForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || issue.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className=" rounded-lg flex items-center justify-center"><Image src="/Logo.png" alt="SnapFix logo"  width={300} height={100}  className="h-[16vh] w-[45vh] " />
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">
                Community Reporting
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>0 active reporters</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location or issue type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="pothole">Potholes</SelectItem>
                    <SelectItem value="streetlight">Street Lights</SelectItem>
                    <SelectItem value="garbage">Garbage</SelectItem>
                    <SelectItem value="manhole">Manholes</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
                  <DialogTrigger asChild>
                    
                      <Link href="/report">
                       <Button className="whitespace-nowrap">
                       Report Issue
                       </Button>
                      </Link>
                      
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Report New Issue</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input placeholder="Issue title" />
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pothole">Pothole</SelectItem>
                          <SelectItem value="streetlight">Street Light</SelectItem>
                          <SelectItem value="garbage">Garbage</SelectItem>
                          <SelectItem value="manhole">Manhole</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea placeholder="Describe the issue..." />
                      <Button variant="outline" className="w-full bg-transparent">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button className="w-full">Submit Report</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Issues List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredIssues.map((issue) => {
                const IconComponent = categoryIcons[issue.category]
                return (
                  <div
                    key={issue.id}
                    className="p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${categoryColors[issue.category]}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground mb-1">{issue.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{issue.location.address}</p>
                        <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className={`text-xs ${statusColors[issue.status]}`}>
                            {issue.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {issue.priority} priority
                          </Badge>
                          <span className="text-xs text-muted-foreground">{issue.votes} votes</span>
                          <span className="text-xs text-muted-foreground">{issue.comments} comments</span>
                        </div>
                      </div>
                      {issue.image && (
                        <Image
                          src={issue.image || "/placeholder.svg"}
                          alt={issue.title}
                           width={300}
                           height={100}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {(() => {
                  const IconComponent = categoryIcons[selectedIssue.category]
                  return <IconComponent className="w-5 h-5" />
                })()}
                {selectedIssue.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedIssue.image && (
                <Image
                  src={selectedIssue.image || "/placeholder.svg"}
                  alt={selectedIssue.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div className="flex items-center gap-2">
                <Badge className={statusColors[selectedIssue.status]}>{selectedIssue.status}</Badge>
                <Badge variant="outline">{selectedIssue.priority} priority</Badge>
              </div>
              <div>
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm text-muted-foreground">{selectedIssue.location.address}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Reported by {selectedIssue.reporter}</span>
                  <span>{selectedIssue.reportedAt}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    👍 {selectedIssue.votes}
                  </Button>
                  <Button variant="outline" size="sm">
                    💬 {selectedIssue.comments}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
