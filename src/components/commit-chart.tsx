import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CustomTooltipContent } from "@/components/custom-tooltip";

interface Repository {
  id: number;
  name: string;
}

interface CommitActivity {
  days: number[];
  total: number;
  week: number;
}

interface CommitChartProps {
  username: string;
  repositories: Repository[];
}

export function CommitChart({ username, repositories }: CommitChartProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [commitData, setCommitData] = useState<
    {
      month: string;
      commits: number;
      Sunday: number;
      Monday: number;
      Tuesday: number;
      Wednesday: number;
      Thursday: number;
      Friday: number;
      Saturday: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (repositories.length > 0 && !selectedRepo) {
      setSelectedRepo(repositories[0].name);
    }
  }, [repositories, selectedRepo]);

  useEffect(() => {
    if (!selectedRepo) return;

    const fetchCommitActivity = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${selectedRepo}/stats/commit_activity`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Commit data not found for this repository."
              : "Failed to fetch commit data. Please try again later."
          );
        }

        const data = await response.json();

        if (!data || !Array.isArray(data)) {
          throw new Error("No commit data available for this repository.");
        }

        const monthNames = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const monthlyAgg = data.reduce((acc, week: CommitActivity) => {
          const date = new Date(week.week * 1000);
          const month = monthNames[date.getMonth()];
          if (!acc[month]) {
            acc[month] = {
              month,
              commits: 0,
              Sunday: 0,
              Monday: 0,
              Tuesday: 0,
              Wednesday: 0,
              Thursday: 0,
              Friday: 0,
              Saturday: 0,
            };
          }
          acc[month].commits += week.total;
          acc[month].Sunday += week.days[0] || 0;
          acc[month].Monday += week.days[1] || 0;
          acc[month].Tuesday += week.days[2] || 0;
          acc[month].Wednesday += week.days[3] || 0;
          acc[month].Thursday += week.days[4] || 0;
          acc[month].Friday += week.days[5] || 0;
          acc[month].Saturday += week.days[6] || 0;
          return acc;
        }, {} as Record<string, {
          month: string;
          commits: number;
          Sunday: number;
          Monday: number;
          Tuesday: number;
          Wednesday: number;
          Thursday: number;
          Friday: number;
          Saturday: number;
        }>);

        const formattedData = Object.values(monthlyAgg) as {
          month: string;
          commits: number;
          Sunday: number;
          Monday: number;
          Tuesday: number;
          Wednesday: number;
          Thursday: number;
          Friday: number;
          Saturday: number;
        }[];

        setCommitData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        setCommitData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommitActivity();
  }, [username, selectedRepo]);

  const handleRepoChange = (value: string) => {
    setSelectedRepo(value);
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const colors = ["#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a", "#042f2e", "#022c22"];

  return (
    <div className="flex-1 min-w-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-20"
      >
        <Card className="border-teal-500/20 overflow-hidden">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <CardTitle>Commit Activity</CardTitle>
                <CardDescription>
                  Monthly commit history for selected repository
                </CardDescription>
              </div>
              <Select value={selectedRepo} onValueChange={handleRepoChange}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Select repository" />
                </SelectTrigger>
                <SelectContent>
                  {repositories.map((repo) => (
                    <SelectItem key={repo.id} value={repo.name}>
                      {repo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : commitData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No commit data available for this repository
              </div>
            ) : (
              <>
                <div className="h-full w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <ChartContainer
                      config={{
                        bar: {
                          label: "Bar Chart",
                          icon: undefined,
                          color: "#14b8a6",
                        },
                      }}
                    >
                      <BarChart data={commitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip content={<CustomTooltipContent />} />
                        {dayNames.map((day, index) => (
                          <Bar
                            key={day}
                            dataKey={day}
                            stackId="a"
                            fill={colors[index]}
                            name={day}
                          />
                        ))}
                      </BarChart>
                    </ChartContainer>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {dayNames.map((day, index) => (
                    <div key={day} className="flex items-center gap-1 text-xs">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: colors[index] }}
                      />
                      <span>{day}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
