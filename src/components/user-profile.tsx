"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, LinkIcon, Twitter, Users, GitFork } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

interface UserProfileProps {
  user: {
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
}

export function UserProfile({ user }: UserProfileProps) {
  if (!user) return null

  const joinedDate = new Date(user.created_at || Date.now())

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden border-teal-500/20">
        <div className="h-24 bg-gradient-to-r from-teal-500 to-emerald-500" />
        <CardContent className="p-6 pt-0 -mt-12">
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0"
            >
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback>{user.login.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="space-y-4 flex-1 pt-6 md:pt-0">
              <div>
                <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-teal-500 transition-colors"
                >
                  @{user.login}
                </a>
              </div>

              {user.bio && <p>{user.bio}</p>}

              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                >
                  <Users className="h-3 w-3" />
                  {user.followers.toLocaleString()} followers
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                >
                  <Users className="h-3 w-3" />
                  {user.following.toLocaleString()} following
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-teal-500/10 text-teal-500 hover:bg-teal-500/20"
                >
                  <GitFork className="h-3 w-3" />
                  {user.public_repos.toLocaleString()} repositories
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-500" />
                  Joined {formatDistanceToNow(joinedDate, { addSuffix: true })}
                </div>

                {user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal-500" />
                    {user.location}
                  </div>
                )}

                {user.blog && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-teal-500" />
                    <a
                      href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-500 transition-colors truncate"
                    >
                      {user.blog}
                    </a>
                  </div>
                )}

                {user.twitter_username && (
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-teal-500" />
                    <a
                      href={`https://twitter.com/${user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-500 transition-colors"
                    >
                      @{user.twitter_username}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

