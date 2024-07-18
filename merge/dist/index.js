const core = require('@actions/core');
const { Octokit } = require("@octokit/action");

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

const head = core.getInput('head');
const base = core.getInput('base');

core.info(`merging ${head} to ${base} ...`)

octokit.request('POST /repos/{owner}/{repo}/merges', {
    owner: owner,
    repo: repo,
    base: base,
    head: head,
}).catch(err => octokit.error(err));
