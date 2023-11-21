package OMAS.OfficeTableReservationSystem.IGNORE.mapper;

import org.mapstruct.BeanMapping;
import org.mapstruct.InheritConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import OMAS.OfficeTableReservationSystem.IGNORE.dto.AdminLoginDto;
import OMAS.OfficeTableReservationSystem.IGNORE.json.AuthLogin;

@Mapper(componentModel="spring")
public interface AdminLoginJsonToDtoMapper {
    AdminLoginJsonToDtoMapper INSTANCE = Mappers.getMapper(AdminLoginJsonToDtoMapper.class);

    @BeanMapping(ignoreByDefault=true)

    @Mapping(source = "username", target = "username")

    @Mapping(source = "password", target = "password")

    AdminLoginDto toUsers(AuthLogin source);

    @BeanMapping(ignoreByDefault=true)
    @InheritConfiguration
    void updateUsers(AuthLogin source, @MappingTarget AdminLoginDto target);
}
