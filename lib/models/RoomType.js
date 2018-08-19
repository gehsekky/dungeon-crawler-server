class RoomType {
  constructor() {
    this.roomTypeId = null;
    this.name = null;
  }

  static load(dbRoomType) {
    const roomType = new RoomType();
    roomType.roomTypeId = dbRoomType.roomTypeId;
    roomType.name = dbRoomType.name;

    return roomType;
  }
}

RoomType.ROOM_TYPE_COMBAT = 'combat';
RoomType.ROOM_TYPE_START = 'start';
RoomType.ROOM_TYPE_FILLER = 'filler';
RoomType.ROOM_TYPE_STORY = 'story';

module.exports = RoomType;