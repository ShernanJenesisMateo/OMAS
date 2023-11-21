package OMAS.OfficeTableReservationSystem.IGNORE.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.UsersInDto;
import OMAS.OfficeTableReservationSystem.IGNORE.model.Users;

@Mapper(componentModel="spring")
public interface UserDtoToMdlMapper {
    UserDtoToMdlMapper INSTANCE = Mappers.getMapper(UserDtoToMdlMapper.class);

    @BeanMapping(ignoreByDefault=true)

    @Mapping(source = "username", target = "username")

    @Mapping(source = "password", target = "password")

    Users toUsers(UsersInDto source);

    @BeanMapping(ignoreByDefault=true)
    @InheritConfiguration
    void updateUsers(UsersInDto source, @MappingTarget Users target);
}
