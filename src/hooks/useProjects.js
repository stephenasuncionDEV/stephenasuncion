import { useState, useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider';
import { Octokit, App } from 'octokit'

export const useProjects = () => {
    const { octokit } = useCore();
    const [repositories, setRepositories] = useState([]);

    // Get Repositories
    useEffect(() => {
        if (repositories.length > 0) return;
        const getRepositories = async () => {
            const test = await octokit.request('GET /user/repos', {
                type: 'public',
                sort: 'updated'
            })
            console.log(test.data)
            setRepositories(test.data);
        }
        getRepositories();
    }, [])

    return {
        repositories
    }
}