const ClientError = require('../../exceptions/ClientError');

/* eslint-disable no-underscore-dangle */
class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postNoteHandler = (request, h) => {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    const noteId = this._service.addNote({ title, body, tags });

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId,
      },
    });
    response.code(201);
    return response;
  };

  getNotesHandler = () => {
    const notes = this._service.getNotes();
    return {
      status: 'success',
      data: {
        notes,
      },
    };
  };

  getNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    const note = this._service.getNoteById(id);
    return {
      status: 'success',
      data: {
        note,
      },
    };
  };

  putNoteByIdHandler = (request, h) => {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
    this._service.editNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    };
  };

  deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    this._service.deleteNoteById(id);

    return {
      status: 'success',
      message: 'Catatan berhasil dihapus',
    };
  };
}

module.exports = NotesHandler;
