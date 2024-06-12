<template>
  <div class="faq">
    <h1>Frequently Asked Questions?</h1>
    <div>
      <a-collapse accordion>
        <a-collapse-panel :header="panel.header" :key="panel.key" v-for="panel in faqData">
          <p>{{ panel.content }}</p>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import { Collapse as ACollapse, CollapsePanel as ACollapsePanel } from 'ant-design-vue'
export default {
  data() {
    return {
      faqData: [
        {
          key: '1',
          header: 'How can I exchange books on  Bookers?',
          content:
            'To exchange books, navigate to the list of available books and select the one you want to exchange. Click on "Go to Exchanges," choose from the available books, and you will be directed to the persons Telegram or WhatsApp to finalize the exchange.'
        },
        {
          key: '2',
          header: 'What is the maximum number of questions I can create for a quiz?',
          content: 'The maximum number of questions you can create for a quiz is 25.'
        },
        {
          key: '3',
          header: 'Is there a cost to join Bookers?',
          content:
            'No, joining to Bookers is free. You can create an account, register books, and participate in the community without any cost.'
        },
        {
          key: '4',
          header: 'How do I register a book on Bookers?',
          content:
            'To register a book, log in to your Bookers account and go to the “My books” section. Under the page press the button “upload new book”  and enter the book title. The system will generate from database other book’s details such as author, description and genre of your book. For the first time of uploading new book, you should leave information about your city and rating for the book.'
        },
        {
          key: '5',
          header: 'Can I participate in book crossing without registering?',
          content:
            'While you can see the list of books without registering, creating an account allows you to fully participate in the community. With an account, you can register and track books, join to discussions, leave comments. Also, to create and take a quiz you should to have an account.'
        },
        {
          key: '6',
          header: 'What should I do if a book is not currently available?',
          content:
            'If a book is not currently available, you can save it to your "My Collections" to monitor its availability. You will receive a notification when someone releases that book, allowing you to track and potentially obtain it when it becomes available.'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  font-size: 25px;
  font-weight: 900;
}
.faq {
  padding: 0 15%;
}

:deep(.ant-collapse) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background-color: white;
  border: none;
}

:deep(.ant-collapse-item) {
  border: 1px solid #e2e2e2;
  background-color: #006b61;
  border-radius: 5px !important;
}

:deep(.ant-collapse-header-text),
:deep(.ant-collapse-expand-icon) {
  color: #fff;
}
</style>
