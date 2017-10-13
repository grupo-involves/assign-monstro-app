class GalleryService {
    async list() {
        return [
            {
                nomeAcao: "Casa Café Pilão",
                nomeResponsavel: "José dos Reis",
                imagem: require("./../components/assets/gallery-sample-1.jpg"),
            },
            {
                nomeAcao: "Coca Zero, é possível",
                nomeResponsavel: "Mariana Ribeiro",
                imagem: require("./../components/assets/gallery-sample-2.jpg"),
            },
            {
                nomeAcao: "Tanque Antartica",
                nomeResponsavel: "Marcus Floriano",
                imagem: require("./../components/assets/gallery-sample-3.jpg"),
            },
            {
                nomeAcao: "Pepsi Mario",
                nomeResponsavel: "José Pedro",
                imagem: require("./../components/assets/gallery-sample-4.jpg"),
            },
        ]
    }
}

export default new GalleryService()
