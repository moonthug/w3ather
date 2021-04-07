import { connect } from 'mongoose';

export async function connectToDb(uri: string) {
  try {
    await connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};
