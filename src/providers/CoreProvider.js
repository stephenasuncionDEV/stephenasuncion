import { useState, useContext, createContext } from 'react'
import { Octokit } from 'octokit'

const newOctokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [octokit, setOctokit] = useState(newOctokit);

    const controllers = {
        octokit,
        setOctokit
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}