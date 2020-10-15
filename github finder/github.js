class Github {
    constructor() {
        this.client_id = '25f3268e6968ecd1b495';
        this.client_secret = '18f43fdb5d0518f7513edc6eb5c6bbf99470fccc';
        this.repos_count = 5;
        this.repos_sort = 'created:asc'
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
    
    
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }

}