<template>
    <div style="height: 250vh;">
        <div class="search">
            <div>
                <img style="width: 600px;" src="@/assets/images/crossing.svg">
                <div style="display: flex; margin-top: 80px;">
                    <img style="height: 150px;" src="@/assets/images/word.svg">
                    <div style="margin-left: 40px;">
                        <h2>Our collection will help your home looks better <br> and we provide the best product for
                            you.
                        </h2>
                        <hr>
                        <a-button style="margin-top: 50px; width: 170px; height: 40px;" type="primary">Search
                            book</a-button>
                    </div>
                </div>
            </div>
            <div>
                <img style="width: 500px;" src="@/assets/images/books.jpeg">
            </div>
        </div>
        <div class="best">
            <h1>New <br> Best book <br> 2024.</h1>

        </div>
        <div class="bestseller">
            <div style="display: flex; justify-content: space-between;">
                <h1>Top-10 best seller book</h1>
                <h2 style="color: #005555;">See all</h2>
            </div>
            <div class="cards">
                <div class="card" v-for="item in bestSellers">
                    <img src="@/assets/images/book1.svg">
                    <div style="margin-left: 20px; padding: 10px;">
                        <h2>{{ item.title }}</h2>
                        <h3>{{ item.author }}</h3>
                        <h2>About the author</h2>
                        <h4>{{ item.abt }}</h4>
                        <h2>Overview</h2>
                        <h4>{{ item.overview }}</h4>
                    </div>
                </div>
            </div>
            <div class="offers">
                <div style="display: flex; justify-content: space-between;">
                    <h1>Offers</h1>
                    <h2 style="color: #005555;">See all</h2>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <img style="border-radius: 0 0 50% 50%;" src="@/assets/images/offer1.svg">
                    <img style="border-radius:  50% 50% 0 0;" src="@/assets/images/offer2.svg">
                    <img style="border-radius: 0 0 50% 50%;" src="@/assets/images/offer3.svg">
                    <img style="border-radius: 50% 50%  0 0;" src="@/assets/images/offer4.svg">
                </div>
            </div>

            <div class="subscription">
                <h1>Subscribe to our newsletter</h1>
                <div class="seek">

                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    components: {

    },
    data() {
        return {
            bestSellers: [
                {
                    img: "@/assets/images/book1.svg",
                    title: "Catcher in the Rye",
                    author: "J.D Salinger",
                    abt: "J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine",
                    overview: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu"
                },
                {
                    img: "@/assets/images/book2.svg",
                    title: "Catcher in the Rye",
                    author: "J.D Salinger",
                    abt: "J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine",
                    overview: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu"
                },
                {
                    img: "@/assets/images/book3.svg",
                    title: "Catcher in the Rye",
                    author: "J.D Salinger",
                    abt: "J.D. Salinger was an American writer, best known for his 1951 novel The Catcher in the Rye. Before its publi cation, Salinger published several short stories in Story magazine",
                    overview: "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adu"
                },
            ]
        }
    }

}
</script>
<style lang="scss" scoped>
.subscription {
    margin: 100px 0;
    text-align: center;
    align-items: center;

    .seek {
        border-radius: 20px;
        border: 1px #006B61 solid;
        width: 76%;
        height: 40px;
    }
}

.search {
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
}

.bestseller {
    padding: 30px;
    height: 400px;

    .cards {
        display: flex;
        width: max-content;

        .card {
            background-color: #006B61;
            color: #ffffff;
            margin-right: 20px;
            padding: 20px;
            align-items: center;
            display: flex;
            max-height: 260px;
            max-width: 500px;

            img {
                height: 200px;

            }

            h1 {
                color: white;
            }

            h2 {
                color: #ffffff;
            }
        }
    }

    h1 {
        font-size: 50px;
        font-weight: bolder;
    }

    h2 {
        color: #006B61;
        font-weight: 900;
    }
}

.offers {
    margin: 40px 0;

    img {
        height: 350px;
        max-height: 350px;
        width: 270px;
    }
}

.best {
    height: 400px;
    background-color: #006B61;
    padding: 30px;

    h1 {
        color: #ffffff;
        font-size: 50px;
        font-weight: bolder;
    }
}
</style>