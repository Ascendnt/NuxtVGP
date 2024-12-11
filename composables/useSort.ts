// It will be available as useSort() (camelCase of file name without extension)
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

    const getDate = data.value?.launches;


    const launchDetails =
        getDate.map((launch) => ({
            mission: launch.mission_name,
            date: launch.launch_date_utc,
            launchSite: launch.launch_site || 'No details Available',
            rocketName: launch.rocket.rocket_name,
            details: launch.details || 'No details available',
        })) || [];

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

    // 
    // const sortBy = [{ key: 'calories', order: 'asc' }];

    // const sortDateAscend = getDate?.sort(
    //     (a, b) => new Date(a.launch_date_utc).getTime() + new Date(b.launch_date_utc).getTime(),
    // );
    // console.log(sortDateAscend);

    // const sortDateDescend = getDate?.sort(
    //     (a, b) => new Date(b.launch_date_utc).getTime() - new Date(a.launch_date_utc).getTime(),
    // );
    // console.log(sortDateDescend);
    // return useState('foo', () => 'bar');
}
