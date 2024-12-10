// It will be available as useFilter() (camelCase of file name without extension)
import { ref, computed } from 'vue';

export default function (data) {

    // Check the data of launches
    const getYear = data.value?.launches;

    // extract the year using getFullYear();
    const years = getYear
        ? getYear.map((launch) => {
            const date = new Date(launch.launch_date_utc);
            return date.getFullYear();
        })
        : [];

    // Variable to store selected year
    const selectedYear = ref(null);

    // Filtered launches based on selected year
    const filteredYear = computed(() => {
        if (selectedYear.value) {
            return getYear.filter(
                (launch) => new Date(launch.launch_date_utc).getFullYear() === selectedYear.value,
            );
        }
        return getYear; // If no year is selected, show all launches
    });

    return {
        years,
        selectedYear,
        filteredYear
    };
}


