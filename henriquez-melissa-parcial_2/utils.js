(() => {
    const Utils = {
        settings: {
            backendBaseUrl: "https://pokeapi.co/api/v2",
        },
        getFormattedBackendUrl: ({ query, searchType }) => {
            return `${Utils.settings.backendBaseUrl}/${searchType}/${query}`;
        },
        
        getPokemon: ({ url, query, searchType = "pokemon" }) => {
            return Utils.fetch({
                url: url ? query : Utils.getFormattedBackendUrl({ query, searchType }),
                searchType,
            });
        },
        fetch: async ({ url, searchType }) => {
            try {
                const rawResponse = await fetch(url);
                if (rawResponse.status !== 200) {
                    throw new Error(`${searchType} not found`);
                }
                return rawResponse.json();
            } catch (error) {
                throw error;
            }
        },
    };
    document.Utils = Utils;
})();