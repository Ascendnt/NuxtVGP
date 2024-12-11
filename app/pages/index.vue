<template>
	<v-container>
		<p>There are {{ launches?.length || 0 }} launches.</p>

		<!-- <v-select label="Select a year" :items="years"></v-select> -->
		<v-select label="Select a year" :items="['', ...years]" v-model="selectedYear"></v-select>

		<v-data-table
			:headers="headers"
			:items="selectedYear ? filterYear : launchDetails"
			:custom-sort="customSort"
		></v-data-table>
	</v-container>
</template>
<script lang="ts" setup>
import useFilter from '~~/composables/useFilter'
import useSort from '~~/composables/useSort'

// const store = useCounter()
// const selection = ref(0)

const query = gql`
	query Launch {
		launches {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`
const { data } = useAsyncQuery<{
	launches: {
		id: string
		mission_name: string
		launch_date_utc: string
		launch_site: { site_name: string }
		rocket: { rocket_name: string }
		details: string | null
	}[]
}>(query)
const { years, selectedYear, filterYear } = useFilter(data)

const { headers, launchDetails, customSort } = useSort(data)

const launches = computed(() => data.value?.launches ?? [])
</script>
