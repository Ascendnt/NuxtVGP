<template>
	<v-container>
		<p>There are {{ launches?.length || 0 }} launches.</p>

		<!-- <v-select label="Select a year" :items="years"></v-select> -->
		<v-select label="Select a year" :items="['', ...years]" v-model="selectedYear"></v-select>

		<ul>
			<li v-for="launch in filteredYear" :key="launch.launch_date_utc">
				<h2>Mission name: {{ launch.mission_name }}</h2>
				<p>Launch date: {{ launch.launch_date_utc }}</p>
				<!-- Called launch_site beucase the site_name cannot be read -->
				<p>Launch Site: {{ launch.launch_site }}</p>
				<!-- All of them are null -->
				<!-- <p>Launch Site: {{ launch.launch_site.site_name }}</p>  -->
				<p>Rocket name: {{ launch.rocket.rocket_name }}</p>

				<p>Details: {{ launch.details }}</p>
			</li>
		</ul>
	</v-container>
</template>
<script lang="ts" setup>
import useFilter from '~~/composables/useFilter'

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
const { years, selectedYear, filteredYear } = useFilter(data)

// console.log(data.value.launches)

// // Check the data of launches
// const getYear = data.value?.launches

// // extract the year using getFullYear();
// const years = getYear
// 	? getYear.map((launch) => {
// 			const date = new Date(launch.launch_date_utc)
// 			return date.getFullYear()
// 		})
// 	: []

// // Variable to store selected year
// const selectedYear = ref(null)

// // Filtered launches based on selected year
// const filteredYear = computed(() => {
// 	if (selectedYear.value) {
// 		return getYear.filter(
// 			(launch) => new Date(launch.launch_date_utc).getFullYear() === selectedYear.value,
// 		)
// 	}
// 	return getYear // If no year is selected, show all launches
// })

const launches = computed(() => data.value?.launches ?? [])
</script>
