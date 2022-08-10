import { useState, useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'

export const useAbout = () => {
    const { octokit } = useCore();
    const [recentCommit, setRecentCommit] = useState('');
    const [contributions, setContributions] = useState();
    const [totalContributions, setTotalContributions] = useState();

    // Get Recent Commit
    useEffect(() => {
        if (recentCommit) return;
        const getEvents = async () => {
            const res = await octokit.request('GET /repos/{owner}/{repo}/events', {
                owner: 'stephenasuncionDEV',
                repo: 'stephenasuncionDEV.github.io'
            })

            const { payload: { commits } } = res.data.filter((commit) => commit.payload.ref === 'refs/heads/main')[0];
            const { message } = commits[commits.length - 1];
            
            setRecentCommit(message);
        }
        getEvents();
    }, [])

    // Get Contributions
    useEffect(() => {
        if (contributions) return;
        const getContributions = async () => {
            const res = await octokit.graphql(
                `query($owner:String!) { 
                    user(login: $owner){
                        contributionsCollection {
                            contributionCalendar {
                            totalContributions
                            weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                    }
                                }
                            }
                        }
                    }
                }`,
            {
                owner: 'stephenasuncionDEV'
            });

            const { totalContributions, weeks } = res.user.contributionsCollection.contributionCalendar;

            const newWeeks = weeks.map((week) => {
                return week.contributionDays
            })

            setTotalContributions(totalContributions);
            setContributions(newWeeks);
        }
        getContributions();
    }, [])

    return {
        recentCommit,
        contributions,
        totalContributions
    }
}