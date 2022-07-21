import { Meta, Story } from '@storybook/vue3'
import OkuButton from '../atom/Button.vue'

export default {
  title: 'Components',
  component: OkuButton,
  // parameters: {
  //   docs: {
  //     page: true,
  //   },
  // },
} as Meta

const Template: Story<typeof OkuButton> = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { OkuButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      ...args,
    }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `       
        <OkuButton>
        asdas
        </OkuButton>
        `,
})

export const Default = Template

