import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json'

const buildPoints = (quest) => {
    let result = {};
    const pushPoint = (map, point) => {
        if (!result[map]) result[map] = [];
        result[map].push(point);
    };

    if (quest.start.guides.length > 0) {
        let start = quest.start;
        let point_info = {
            Types: "Start",
            ObjectName: start.name,
            ObjectID: start.id,
            ObjectType: start.type,
        };
        for (let guide of start.guides)
            if (guide.coordinates) {
                for (let coordinate of guide.coordinates)
                    pushPoint(guide.map, {
                        ...point_info,
                        Coordinates: coordinate,
                    });
            } else if (guide.coordinate) {
                pushPoint(guide.map, {
                    ...point_info,
                    Coordinates: guide.coordinate,
                });
            }
    }
    if (quest.end.guides.length > 0) {
        let end = quest.end;
        let point_info = {
            Types: "End",
            ObjectName: end.name,
            ObjectID: end.id,
            ObjectType: end.type,
        };
        for (let guide of end.guides)
            if (guide.coordinates) {
                for (let coordinate of guide.coordinates)
                    pushPoint(guide.map, {
                        ...point_info,
                        Coordinates: coordinate,
                    });
            } else if (guide.coordinate) {
                pushPoint(guide.map, {
                    ...point_info,
                    Coordinates: guide.coordinate,
                });
            }
    }
    if (quest.questValues?.length > 0) {
        for (let index in quest.questValues) {
            let questValue = quest.questValues[index];
            if (questValue.guides?.length > 0) {
                for (let guide of questValue.guides) {
                    let point_info = {
                        Types: `State${parseInt(index) + 1}`,
                        ObjectName: guide.name,
                        ObjectID: guide.id,
                        ObjectType: guide.type,
                    }
                    if (guide.coordinates) {
                        for (let coordinate of guide.coordinates)
                            pushPoint(guide.map, {
                                ...point_info,
                                Coordinates: coordinate,
                            });
                    } else if (guide.coordinate) {
                        pushPoint(guide.map, {
                            ...point_info,
                            Coordinates: guide.coordinate,
                        });
                    }

                }
            }
        }
    }
    if (quest.needItems?.length > 0) {
        for (let index in quest.needItems) {
            let needItem = quest.needItems[index];
            if (needItem.guides?.length > 0) {
                for (let guide of needItem.guides) {
                    let point_info = {
                        Types: `NeedItem${parseInt(index) + 1}`,
                        ObjectName: guide.name,
                        ObjectID: guide.id,
                        ObjectType: guide.type,
                    }
                    if (guide.coordinates) {
                        for (let coordinate of guide.coordinates)
                            pushPoint(guide.map, {
                                ...point_info,
                                Coordinates: coordinate,
                            });
                    } else if (guide.coordinate) {
                        pushPoint(guide.map, {
                            ...point_info,
                            Coordinates: guide.coordinate,
                        });
                    }
                }
            }
        }
    }
    if (quest.killNpcs?.length > 0) {
        for (let index in quest.killNpcs) {
            let killNpc = quest.killNpcs[index];
            if (killNpc.guides?.length > 0) {
                for (let guide of killNpc.guides) {
                    let point_info = {
                        Types: `KillNpc${parseInt(index) + 1}`,
                        ObjectName: guide.name,
                        ObjectID: guide.id,
                        ObjectType: guide.type,
                    }
                    if (guide.coordinates) {
                        for (let coordinate of guide.coordinates)
                            pushPoint(guide.map, {
                                ...point_info,
                                Coordinates: coordinate,
                            });
                    } else if (guide.coordinate) {
                        pushPoint(guide.map, {
                            ...point_info,
                            Coordinates: guide.coordinate,
                        });
                    }
                }
            }
        }
    }
    return result;
}

const schoolIcon = (school) => {
    let filenameMap = {
        北天药宗: '药宗',
        凌雪阁: '凌雪',
        衍天宗: '衍天'
    }
    if (filenameMap[school]) return school = filenameMap[school];
    return `${__imgPath}/image/school/${school}.png`;
}

export { buildPoints, schoolIcon };
