/* eslint-disable no-underscore-dangle */
class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;
  }

  postCollaborationHandler = async (request, h) => {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, userId);
    const collaborationId = await this._collaborationsService.addCollaboration(
      noteId,
      userId
    );

    const response = h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  };

  deleteCollaborationHandler = async (request, h) => {
    this._validator.validateCollaborationPayload(request.payload);
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;

    await this._notesService.verifyNoteOwner(noteId, userId);
    await this._collaborationsService.deleteCollaboration();

    return {
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    };
  };
}

module.exports = CollaborationsHandler;
