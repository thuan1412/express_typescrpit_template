import { getRepository } from "typeorm";
import User from "../entities/user";

export default getRepository(User); // you can also get it via getConnection().getRepository() or getManager().getRepository()
// const user = await userRepository.findOne(1);
// user.name = "Umed";
// await userRepository.save(user);
