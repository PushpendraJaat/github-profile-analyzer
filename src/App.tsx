"use client"

import { useState } from "react"
import { GitHubProfileAnalyzer } from "@/components/github-profile-analyzer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Search, BarChart, GitBranch, Users } from "lucide-react"

export default function Home() {
  const [showSearch, setShowSearch] = useState(false)

  const features = [
    {
      icon: <Github className="h-8 w-8" />,
      title: "Profile Details",
      description: "View comprehensive GitHub profile information including bio, location, and social links.",
    },
    {
      icon: <GitBranch className="h-8 w-8" />,
      title: "Repository Analysis",
      description: "Browse and search through repositories with details on stars, forks, and languages.",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Commit Visualization",
      description: "Analyze commit patterns with interactive charts showing daily and weekly activity.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Network Insights",
      description: "Understand user connections through follower and following metrics.",
    },
  ]

  return (
    <main className="container mx-auto py-10 px-4 relative z-10">
      {!showSearch ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent"
            >
              GitHub Profile Analyzer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground"
            >
              Discover insights from any GitHub profile with detailed metrics and visualizations
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={() => setShowSearch(true)}
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
              >
                <Search className="mr-2 h-5 w-5" />
                Analyze a GitHub Profile
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-teal-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-muted-foreground mb-6">
              Enter any GitHub username to get started with detailed analytics and insights.
            </p>
            <Button
              onClick={() => setShowSearch(true)}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">GitHub Profile Analyzer</h1>
            <Button variant="outline" onClick={() => setShowSearch(false)}>
              Back to Home
            </Button>
          </div>
          <GitHubProfileAnalyzer />
        </motion.div>
      )}
    </main>
  )
}

