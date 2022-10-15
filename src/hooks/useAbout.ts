import { Endpoints } from '@octokit/types'
import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from '@/providers/CoreProvider'
import errorHandler from '@/helpers/errorHandler'

export type ContributionDay = {
    contributionCount: number,
    date: string
}

export type ContributionDays = {
    contributionDays: Array<ContributionDay>
}

export type ContributionWeek = Array<ContributionDay>

export type Contributions = Array<ContributionWeek>;

export interface AboutProps {
    recentCommit: string;
    contributions: Contributions;
    totalContributions: number;
}

export type listUserRepoEventsResponse = Endpoints['GET /repos/{owner}/{repo}/events']['response'];

export const useAbout = (): AboutProps => {
    const toast = useToast({
        title: 'Error',
        status: 'error',
        duration: 3000,
        isClosable: true
    });
    const { octokit } = useCore();
    const [recentCommit, setRecentCommit] = useState<string>('');
    const [contributions, setContributions] = useState<Contributions>([] as Contributions);
    const [totalContributions, setTotalContributions] = useState<number>(0);

    useEffect(() => {
        getRecentCommit();
        getContributions();
    }, [])

    const getRecentCommit = async () => {
        try {
            const res: listUserRepoEventsResponse = await octokit.request('GET /repos/{owner}/{repo}/events', {
                owner: 'stephenasuncionDEV',
                repo: 'stephenasuncionDEV.github.io'
            })

            if (res.status !== 200) return;

            const events = res.data
                .filter((event) => event.type === 'PushEvent' && event.payload.ref === 'refs/heads/main')
                .map((pushEvent) => pushEvent.payload.commits);

            const { message } = events[events.length - 1][0];

            setRecentCommit(message);
        }
        catch (err: any) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    const getContributions = async () => {
        try {
            const res: any = await octokit.graphql(
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
    
            const newWeeks = weeks.map((week: ContributionDays) => {
                return week.contributionDays
            })
    
            setTotalContributions(totalContributions);
            setContributions(newWeeks);
        }
        catch (err: any) {
            const msg = errorHandler(err);
            toast({ description: msg });
        }
    }

    return {
        recentCommit,
        contributions,
        totalContributions
    }
}