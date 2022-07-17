

export const transferTimeToString = (sec) => {
  let mins = Math.floor( sec / 60 );
  let secs = sec % 60;
  return `${ mins < 10 ? '0' + mins : mins }:${ secs < 10 ? '0' + secs : secs }`;
}

export const create_Participants = (nums) => {
  let participants = [];
  if( nums <= 0 ) return participants;
  for (let i=0; i<nums; i++) {
    participants.push({name: `participant_${i}`, id: `hash_${i}`});
  }
  return participants;
}