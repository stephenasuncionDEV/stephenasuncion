import { useState, useEffect } from 'react'
import { useCore } from '@/providers/CoreProvider'

export const useProjects = () => {
    const { octokit } = useCore();
    const [repositories, setRepositories] = useState([]);
    
    // Get Repositories
    useEffect(() => {
        if (repositories.length > 0) return;
        const getRepositories = async () => {
            const res = await octokit.request('GET /user/repos', {
                type: 'public',
                sort: 'updated'
            })
            setRepositories(res.data);
        }
        getRepositories();
    }, [])

    return {
        repositories
    }
}