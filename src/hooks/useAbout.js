import { useState, useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'

export const useAbout = () => {
    const { octokit } = useCore();
    const [recentCommit, setRecentCommit] = useState('');

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

    return {
        recentCommit
    }
}