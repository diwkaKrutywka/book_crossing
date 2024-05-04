<template>
    <div class="faq">
        <h1>Frequently Asked Questions?</h1>
        <div >
            <a-collapse accordion>
                    <a-collapse-panel :header="panel.header" :key="panel.key" v-for="panel in faqData">
                        <p>{{ panel.content }}</p>
                    </a-collapse-panel>
            </a-collapse>
        </div>
    </div>
</template>

<script>
import { Collapse as ACollapse, CollapsePanel as ACollapsePanel } from 'ant-design-vue';
export default {
    data() {
        return {
            faqData: [
                { key: '1', header: 'How can I exchange books?', content: 'Answer to question 1...' },
                { key: '2', header: 'How can I exchange books?', content: 'Answer to question 2...' },
                { key: '3', header: 'How can I exchange books?', content: 'Answer to question 3...' },
                { key: '4', header: 'How can I exchange book and if I want to give back, what should I do?', content: 'Answer to question 4...' },
                { key: '5', header: 'How can I exchange book and if I want to give back, what should I do?', content: 'Answer to question 5...' },
                { key: '6', header: 'How can I exchange book and if I want to give back, what should I do?', content: 'Answer to question 6...' },
            ]
        }
    }
}
</script>

<style scoped lang="scss">
h1{
    text-align: center;
    font-size: 25px;
    font-weight: 900;
}
.faq{
    padding: 0 15%;
}

:deep(.ant-collapse){
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    background-color: white;
    border: none;
}

:deep(.ant-collapse-item){
    border: 1px solid #e2e2e2;
    background-color: #006B61;
    border-radius: 5px !important;
}

:deep(.ant-collapse-header-text), :deep(.ant-collapse-expand-icon) {
    color: #fff;
}
</style>