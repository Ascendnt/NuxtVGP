// It will be available as useSort() (camelCase of file name without extension)

// header for table
export default function (data) {
    const headers = [
        {
            title: 'Mission Name',
            value: 'mission',
            sortable: false,
        },
        {
            title: 'Date',
            value: 'date',
            sortable: true,
        },
        {
            title: 'Launch Site',
            value: 'launchSite',
            sortable: false,
        },
        {
            title: 'Rocket Name',
            value: 'rocketName',
            sortable: false,
        },
        {
            title: 'Details',
            value: 'details',
            sortable: false,
        },
    ];

    const getDate = data.value?.launches || [];

    // showing the details of launch
    const launchDetails =
        getDate.map((launch) => ({
            mission: launch.mission_name,
            date: launch.launch_date_utc,
            launchSite: launch.launch_site || 'No details Available',
            rocketName: launch.rocket.rocket_name,
            details: launch.details || 'No details available',
        })) || [];


    // Sorting by date
    const customSort = function (items, index, isDesc) {
        items.sort((a, b) => {
            if (index[0] == 'date') {
                if (!isDesc[0]) {
                    return new Date(b[index]) - new Date(a[index]);
                } else {
                    return new Date(a[index]) - new Date(b[index]);
                }
            }
        });
        return items;
    };

    return {
        headers,
        launchDetails,
        customSort,

    };

}
