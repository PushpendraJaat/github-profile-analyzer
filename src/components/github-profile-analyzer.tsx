"use client"

import type React from "react"

import { useState } from "react"
import { UserProfile } from "@/components/user-profile"
import { RepositoryList } from "@/components/repository-list"
import { CommitChart } from "@/components/commit-chart"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"
import { ProfileSkeleton } from "@/components/skeletons/profile-skeleton"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  html_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  company: string | null
  location: string | null
  blog: string | null
  twitter_username: string | null
}

interface GitHubRepo {
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

export function GitHubProfileAnalyzer() {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = async () => {
    if (!username.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      if (!username.trim()) {
        setError("Please enter a GitHub username")
        setIsLoading(false)
        return
      }

      // Fetch user profile
      const userResponse = await fetch(`https://api.github.com/users/${username}`)

      if (!userResponse.ok) {
        throw new Error(
          userResponse.status === 404
            ? "User not found. Please check the username and try again."
            : "Failed to fetch user data. Please try again later.",
        )
      }

      const userData = await userResponse.json()
      setUser(userData)

      // Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)

      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories. Please try again later.")
      }

      const reposData = await reposResponse.json()
      setRepos(reposData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setUser(null)
      setRepos([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchUserData()
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-6 max-w-7xl mx-auto px-4 lg:px-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading} className="bg-teal-500 hover:bg-teal-600">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Loading
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search
            </span>
          )}
        </Button>
      </form>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <UserProfile user={user} />

              <Tabs defaultValue="repositories">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="repositories">Repositories ({repos.length})</TabsTrigger>
                  <TabsTrigger value="activity">Commit Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="repositories" className="mt-4">
                  <RepositoryList repositories={repos} />
                </TabsContent>
                <TabsContent value="activity" className="mt-4">
                  <div className="pb-10">
                    <CommitChart username={user.login} repositories={repos} />
                  </div>
                </TabsContent>

              </Tabs>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  )
}

