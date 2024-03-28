<template>
    <div class="menu-box-area">
        <div class="menus">
            <!-- <div class="align-center justify-center" style="border-bottom: #933ee2 1px solid; margin: 20px auto">
                <img style="width: 80%; padding: 20px 0" src="@/assets/images/logo.svg" />
            </div> -->
            <div class="menus-item" v-for="(item, index) in menuList" :key="index">
                <div class="row" :class="{
                active: routerName == item.routerName && item.children.length == 0,
            }" @click="(e) => {
                onSetMenu(item.routerName);
            }
                ">
                    <span class="icon black material-symbols-outlined" style="">
                        {{ item.icon }}
                    </span>
                    <span class="text">{{ getMenuName(item.name) }}</span>
                    <span class="flex-1"></span>
                    <span class="icon icon-right material-symbols-outlined"
                        :class="{ show: menuOpenKeys.includes(item.routerName) }" v-show="item.children.length > 0">
                        chevron_right
                    </span>
                </div>
                <div class="row" :class="{ active: routerName == childrenItem.routerName }"
                    v-for="(childrenItem, childrenIndex) in item.children" :key="childrenIndex"
                    @click="onSetMenu(childrenItem.routerName)" v-show="menuOpenKeys.includes(item.routerName)">
                    <div class="text" style="margin-left: 25px">
                        {{ getMenuName(childrenItem.name) }}
                    </div>
                </div>
            </div>
            <div class="footer active-color">
                <span v-if="hasLogin" class="active material-symbols-outlined pointer"
                    style="font-size: 18px; font-weight: bold; color: black" @click="$store.signOut()">
                    logout
                </span>
                <router-link style="color: black" v-else to="/login">{{
                $t("l_Login")
                    }}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["select"],
    data() {
        return {
            active: 0,
            menuList: [],
            menuOpenKeys: [],
        };
    },
    watch: {
        langTag() {
            setTimeout(() => {
                this.setMenuList();
            }, 200);
        },
        hasLogin(val) {
            console.log(val);
            if (val == false) {
                this.$router.push({
                    name: "LoginView",
                });
            }
        },
    },
    computed: {
        langTag() {
            return this.$i18n.locale;
        },
        routerName() {
            return this.$route.name;
        },
        hasLogin() {
            return this.$store.hasLogin;
        },
    },
    mounted() {
        console.log("------menu------");
        this.setMenuList();
    },
    methods: {
        onSetMenu(e) {
            if (!e || e.indexOf("__") == 0) {
                if (!e) return;
                if (this.menuOpenKeys.includes(e)) {
                    this.menuOpenKeys.splice(this.menuOpenKeys.indexOf(e), 1);
                } else {
                    this.menuOpenKeys.push(e);
                }
                return;
            }
            // this.active = e;
            this.$router.push({
                name: e,
            });
            this.$emit("select", 1);
        },
        async setMenuList() {
            let arr = [
                {
                    name: this.$t("l_Books"),
                    routerName: "BookList",
                    icon: "books",
                    permissionTag: "__",
                    expand: true,
                    children: [],
                },
            ];
            this.menuList = JSON.parse(JSON.stringify(arr));
        },
        getMenuName(menuName) {
            if (menuName.indexOf("l_") >= 0) {
                let arr = menuName.split(" ");
                let str = "";
                arr.forEach((item) => {
                    let start = "";
                    let end = "";
                    if (item.indexOf("(") == 0) {
                        start = " (";
                    }
                    if (item.indexOf(")") > 0) {
                        end = ")";
                    }
                    item = item.replaceAll("(", "");
                    item = item.replaceAll(")", "");
                    if (item.indexOf("l_") >= 0) {
                        if (!str) {
                            str = this.$t(item);
                        } else {
                            str += start + this.$t(item) + end;
                        }
                    } else {
                        if (!str) {
                            str = item;
                        } else {
                            str += start + item + end;
                        }
                    }
                });
                return str;
            } else {
                return menuName;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.menu-box-area {
    .menus {
        overflow-y: auto;
        position: relative;
        height: 100vh;
        box-sizing: border-box;
        //padding: 10px 0;

        .footer {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 15px;
            height: 35px;
            align-items: center;
            border-top: 1px solid #933ee2;
            font-size: 12px;
        }

        .menus-item {
            // height: 50px;
            display: flex;
            flex-direction: column;

            .row {
                padding: 10px;
                box-sizing: border-box;
                width: 100%;
                display: flex;
                align-items: center;
                color: #f1f1f1;
                transition: all 0.2s;
                white-space: nowrap;

                &:hover {
                    transform: scale(1.05);
                }

                .icon-right {
                    transition: all 0.2s;

                    &.show {
                        transform: rotate(90deg);
                    }
                }
            }

            .icon {
                height: 100%;
                font-size: 20px;
                cursor: pointer;
                margin: auto 0;
            }

            .text {
                height: 100%;
                margin-left: 8px;
                cursor: pointer;
                white-space: ellipsis;
                color: black;
                font-family: Geneva, Arial, Helvetica, sans-serif;
                font-weight: 500;
                font-size: medium;
            }

            &.collapsible {
                justify-content: center;

                .icon {
                    font-size: 25px;
                }
            }

            .active {
                color: white;
                background-color: #933ee2;
                // transform: translate(5px);
                display: flex;
                align-items: center;

                .text {
                    // transform: scale(1.1);
                    color: white;
                }

                .icon {
                    color: white;
                }
            }
        }
    }
}
</style>