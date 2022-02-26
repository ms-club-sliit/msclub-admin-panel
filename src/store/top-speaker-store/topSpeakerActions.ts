import topSpeakerActionTypes from "./topSpeakerActionTypes";
import TopSpeakerAPI from "../api/TopSpeakerAPI";

export const createTopSpeaker = (data: any) => {
	return {
		type: topSpeakerActionTypes.CREATE_TOP_SPEAKER,
		payload: TopSpeakerAPI.createTopSpeaker(data),
	};
};

export const getTopSpeakers = () => {
	return {
		type: topSpeakerActionTypes.GET_ALL_TOP_SPEAKERS,
		payload: TopSpeakerAPI.getTopSpeakers(),
	};
};

export const getDeletedTopSpeakers = () => {
	return {
		type: topSpeakerActionTypes.GET_DELETED_TOP_SPEAKERS,
		payload: TopSpeakerAPI.getDeletedTopSpeakers(),
	};
};

export const updateTopSpeaker = (topSpeakerId: string, data: any) => {
	return {
		type: topSpeakerActionTypes.UPDATE_TOP_SPEAKER,
		payload: TopSpeakerAPI.updateTopSpeaker(topSpeakerId, data),
	};
};

export const deleteTopSpeaker = (topSpeakerId: string) => {
	return {
		type: topSpeakerActionTypes.DELETE_TOP_SPEAKER,
		payload: TopSpeakerAPI.deleteTopSpeaker(topSpeakerId),
	};
};

export const setTopSpeakerId = (topSpeakerId: string) => {
	return {
		type: topSpeakerActionTypes.SET_TOP_SPEAKER_ID,
		payload: topSpeakerId,
	};
};

export const permenentDeleteTopSpeaker = (topSpeakerId: string) => {
	return {
		type: topSpeakerActionTypes.PERMENENT_DELETE_TOP_SPEAKER,
		payload: TopSpeakerAPI.permenentDeleteTopSpeaker(topSpeakerId),
	};
};
export const recoverDeletedTopSpeaker = (topSpeakerId: string) => {
	return {
		type: topSpeakerActionTypes.UPDATE_TOP_SPEAKER,
		payload: TopSpeakerAPI.recoverDeletedTopSpeaker(topSpeakerId),
	};
};
