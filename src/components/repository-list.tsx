"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, GitFork, Calendar } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { RepositorySkeleton } from "@/components/skeletons/repository-skeleton"

interface Repository {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  visibility: string
}

interface RepositoryListProps {
  repositories: Repository[]
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading] = useState(false)

  // Ensure repositories is an array
  const repoArray = Array.isArray(repositories) ? repositories : []

  const filteredRepos = repoArray.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.topics &&
        Array.isArray(repo.topics) &&
        repo.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))),
  )

  // Language color mapping
  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C#": "bg-purple-500",
    PHP: "bg-indigo-500",
    Ruby: "bg-red-600",
    Go: "bg-cyan-500",
    Rust: "bg-orange-600",
    Swift: "bg-orange-500",
    Kotlin: "bg-purple-400",
    HTML: "bg-orange-600",
    CSS: "bg-blue-400",
    Shell: "bg-gray-500",
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search repositories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <RepositorySkeleton count={3} />
      ) : filteredRepos.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No repositories found matching your search.
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4"
        >
          {filteredRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="hover:border-teal-500/50 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-teal-500 transition-colors"
                        >
                          {repo.name}
                        </a>
                      </CardTitle>
                      {repo.description && <CardDescription className="mt-1">{repo.description}</CardDescription>}
                    </div>
                    <Badge variant={repo.visibility === "public" ? "outline" : "secondary"}>{repo.visibility}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {repo.topics.map((topic) => (
                        <Badge
                          key={topic}
                          variant="secondary"
                          className="text-xs bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                        >
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-muted-foreground pt-0">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className={`h-3 w-3 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`} />
                        {repo.language}
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" />
                      {repo.stargazers_count}
                    </div>

                    <div className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" />
                      {repo.forks_count}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Updated {formatDistanceToNow(new Date(repo.updated_at), { addSuffix: true })}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

